import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import type { FoundItem, LoginUser, Reward, UserProfile } from "./types";
import { seedItems, seedPassword, seedRewards, seedUser } from "./seed";

export type AppDatabase = Database.Database;

type CountRow = { count: number };

type UserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
  initials: string;
  location: string;
  join_date: string;
  points: number;
  returns: number;
  recoveries: number;
  rating: number;
};

type ItemRow = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  time_ago: string;
  image_url: string;
  finder_name: string;
  finder_initials: string;
  finder_rating: number;
  claims: number;
  status: "unclaimed" | "claimed";
};

type QuestionRow = { question: string; answer: string };
type BadgeRow = { icon_key: UserProfile["badges"][number]["iconKey"]; label: string; unlocked: number };
type RewardRow = { id: string; title: string; description: string; points_cost: number; icon_key: Reward["iconKey"] };

const defaultDatabasePath = path.join(process.cwd(), "data", "foundfast.sqlite");

export function createDatabase(filename = process.env.DATABASE_PATH ?? defaultDatabasePath): AppDatabase {
  if (filename !== ":memory:") {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
  }

  const db = new Database(filename);
  db.pragma("foreign_keys = ON");
  migrate(db);
  seed(db);
  return db;
}

function migrate(db: AppDatabase): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      initials TEXT NOT NULL,
      location TEXT NOT NULL,
      join_date TEXT NOT NULL,
      points INTEGER NOT NULL,
      returns INTEGER NOT NULL,
      recoveries INTEGER NOT NULL,
      rating REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      icon_key TEXT NOT NULL,
      label TEXT NOT NULL,
      unlocked INTEGER NOT NULL,
      sort_order INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      date TEXT NOT NULL,
      time_ago TEXT NOT NULL,
      image_url TEXT NOT NULL,
      finder_name TEXT NOT NULL,
      finder_initials TEXT NOT NULL,
      finder_rating REAL NOT NULL,
      claims INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('unclaimed', 'claimed'))
    );

    CREATE TABLE IF NOT EXISTS security_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rewards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      points_cost INTEGER NOT NULL,
      icon_key TEXT NOT NULL
    );
  `);
}

function seed(db: AppDatabase): void {
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as CountRow;
  if (userCount.count > 0) {
    return;
  }

  const insertSeed = db.transaction(() => {
    db.prepare(`
      INSERT INTO users (id, name, email, password, initials, location, join_date, points, returns, recoveries, rating)
      VALUES (@id, @name, @email, @password, @initials, @location, @joinDate, @points, @returns, @recoveries, @rating)
    `).run({
      id: "user-1",
      name: seedUser.name,
      email: seedUser.email,
      password: seedPassword,
      initials: seedUser.initials,
      location: seedUser.location,
      joinDate: seedUser.joinDate,
      points: seedUser.points,
      returns: seedUser.stats.returns,
      recoveries: seedUser.stats.recoveries,
      rating: seedUser.stats.rating
    });

    const insertBadge = db.prepare(`
      INSERT INTO badges (user_id, icon_key, label, unlocked, sort_order)
      VALUES (@userId, @iconKey, @label, @unlocked, @sortOrder)
    `);

    seedUser.badges.forEach((badge, index) => {
      insertBadge.run({
        userId: "user-1",
        iconKey: badge.iconKey,
        label: badge.label,
        unlocked: badge.unlocked ? 1 : 0,
        sortOrder: index
      });
    });

    const insertItem = db.prepare(`
      INSERT INTO items (
        id, title, category, description, location, date, time_ago, image_url,
        finder_name, finder_initials, finder_rating, claims, status
      )
      VALUES (
        @id, @title, @category, @description, @location, @date, @timeAgo, @imageUrl,
        @finderName, @finderInitials, @finderRating, @claims, @status
      )
    `);
    const insertQuestion = db.prepare(`
      INSERT INTO security_questions (item_id, question, answer, sort_order)
      VALUES (@itemId, @question, @answer, @sortOrder)
    `);

    seedItems.forEach((item) => {
      insertItem.run({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        location: item.location,
        date: item.date,
        timeAgo: item.timeAgo,
        imageUrl: item.imageUrl,
        finderName: item.finder.name,
        finderInitials: item.finder.initials,
        finderRating: item.finder.rating,
        claims: item.claims,
        status: item.status
      });

      item.securityQuestions.forEach((question, index) => {
        insertQuestion.run({
          itemId: item.id,
          question: question.question,
          answer: question.answer,
          sortOrder: index
        });
      });
    });

    const insertReward = db.prepare(`
      INSERT INTO rewards (id, title, description, points_cost, icon_key)
      VALUES (@id, @title, @description, @pointsCost, @iconKey)
    `);

    seedRewards.forEach((reward) => {
      insertReward.run(reward);
    });
  });

  insertSeed();
}

export function findUserByCredentials(db: AppDatabase, email: string, password: string): LoginUser | null {
  const row = db.prepare(`
    SELECT id, name, email, initials, points
    FROM users
    WHERE email = ? AND password = ?
  `).get(email, password) as LoginUser | undefined;

  return row ?? null;
}

export function getDefaultUser(db: AppDatabase): LoginUser {
  const row = db.prepare("SELECT id, name, email, initials, points FROM users ORDER BY id LIMIT 1").get() as LoginUser | undefined;
  if (!row) {
    throw new Error("Default user was not seeded");
  }
  return row;
}

export function getItems(db: AppDatabase, filters: { q?: string; category?: string }): FoundItem[] {
  const conditions: string[] = [];
  const params: Record<string, string> = {};

  if (filters.q) {
    conditions.push("(LOWER(title) LIKE @q OR LOWER(description) LIKE @q OR LOWER(location) LIKE @q OR LOWER(category) LIKE @q)");
    params.q = `%${filters.q.trim().toLowerCase()}%`;
  }

  if (filters.category && filters.category !== "Todos") {
    conditions.push("category = @category");
    params.category = filters.category;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = db.prepare(`SELECT * FROM items ${where} ORDER BY date DESC, id ASC`).all(params) as ItemRow[];
  return rows.map((row) => toFoundItem(db, row));
}

export function getItemById(db: AppDatabase, id: string): FoundItem | null {
  const row = db.prepare("SELECT * FROM items WHERE id = ?").get(id) as ItemRow | undefined;
  return row ? toFoundItem(db, row) : null;
}

export function createItem(
  db: AppDatabase,
  data: Pick<FoundItem, "title" | "category" | "description" | "location">
): FoundItem {
  const user = getDefaultUser(db);
  const id = crypto.randomUUID();
  const today = new Date().toISOString().slice(0, 10);

  db.prepare(`
    INSERT INTO items (
      id, title, category, description, location, date, time_ago, image_url,
      finder_name, finder_initials, finder_rating, claims, status
    )
    VALUES (
      @id, @title, @category, @description, @location, @date, @timeAgo, @imageUrl,
      @finderName, @finderInitials, @finderRating, @claims, @status
    )
  `).run({
    id,
    title: data.title,
    category: data.category,
    description: data.description,
    location: data.location,
    date: today,
    timeAgo: "Ahora",
    imageUrl: "",
    finderName: user.name,
    finderInitials: user.initials,
    finderRating: 4.9,
    claims: 0,
    status: "unclaimed"
  });

  return getItemById(db, id) as FoundItem;
}

export function claimItem(db: AppDatabase, id: string, answer: string): { matched: boolean; item: FoundItem | null } {
  const item = getItemById(db, id);
  if (!item) {
    return { matched: false, item: null };
  }

  const normalizedAnswer = normalizeAnswer(answer);
  const matched = item.securityQuestions.some((question) => normalizeAnswer(question.answer) === normalizedAnswer);

  if (!matched) {
    return { matched: false, item };
  }

  db.prepare("UPDATE items SET status = 'claimed', claims = claims + 1 WHERE id = ?").run(id);
  return { matched: true, item: getItemById(db, id) };
}

export function getProfileWithRewards(db: AppDatabase): UserProfile & { rewards: Reward[] } {
  const userRow = db.prepare("SELECT * FROM users ORDER BY id LIMIT 1").get() as UserRow | undefined;
  if (!userRow) {
    throw new Error("Default user was not seeded");
  }

  return {
    ...toUserProfile(db, userRow),
    rewards: getRewards(db)
  };
}

export function redeemReward(db: AppDatabase, rewardId: string): { status: "ok"; points: number } | { status: "not-found" } | { status: "insufficient"; points: number } {
  const reward = db.prepare("SELECT * FROM rewards WHERE id = ?").get(rewardId) as RewardRow | undefined;
  if (!reward) {
    return { status: "not-found" };
  }

  const user = db.prepare("SELECT id, points FROM users ORDER BY id LIMIT 1").get() as { id: string; points: number } | undefined;
  if (!user) {
    throw new Error("Default user was not seeded");
  }

  if (user.points < reward.points_cost) {
    return { status: "insufficient", points: user.points };
  }

  const points = user.points - reward.points_cost;
  db.prepare("UPDATE users SET points = ? WHERE id = ?").run(points, user.id);
  return { status: "ok", points };
}

function getRewards(db: AppDatabase): Reward[] {
  const rows = db.prepare("SELECT * FROM rewards ORDER BY CAST(id AS INTEGER)").all() as RewardRow[];
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    pointsCost: row.points_cost,
    iconKey: row.icon_key
  }));
}

function toFoundItem(db: AppDatabase, row: ItemRow): FoundItem {
  const securityQuestions = db.prepare(`
    SELECT question, answer
    FROM security_questions
    WHERE item_id = ?
    ORDER BY sort_order ASC
  `).all(row.id) as QuestionRow[];

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    location: row.location,
    date: row.date,
    timeAgo: row.time_ago,
    imageUrl: row.image_url,
    finder: {
      name: row.finder_name,
      initials: row.finder_initials,
      rating: row.finder_rating
    },
    claims: row.claims,
    status: row.status,
    securityQuestions
  };
}

function toUserProfile(db: AppDatabase, row: UserRow): UserProfile {
  const badges = db.prepare(`
    SELECT icon_key, label, unlocked
    FROM badges
    WHERE user_id = ?
    ORDER BY sort_order ASC
  `).all(row.id) as BadgeRow[];

  return {
    name: row.name,
    email: row.email,
    initials: row.initials,
    location: row.location,
    joinDate: row.join_date,
    points: row.points,
    stats: {
      returns: row.returns,
      recoveries: row.recoveries,
      rating: row.rating
    },
    badges: badges.map((badge) => ({
      iconKey: badge.icon_key,
      label: badge.label,
      unlocked: Boolean(badge.unlocked)
    }))
  };
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
