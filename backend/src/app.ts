import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import {
  claimItem,
  createDatabase,
  createItem,
  findUserByCredentials,
  getItemById,
  getItems,
  getProfileWithRewards,
  redeemReward,
  type AppDatabase
} from "./database";
import { CATEGORIES } from "./seed";

const allowedOrigins = ["http://localhost:8080", "http://localhost:5173"];
const tokenCookieName = "foundfast_token";

type AppOptions = {
  db?: AppDatabase;
  jwtSecret?: string;
};

export function createApp(options: AppOptions = {}) {
  const db = options.db ?? createDatabase();
  const jwtSecret = options.jwtSecret ?? process.env.JWT_SECRET ?? "foundfast-dev-secret";
  const app = express();

  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/auth/login", (req, res) => {
    const missing = requiredFields(req.body, ["email", "password"]);
    if (missing.length > 0) {
      return badRequest(res, missing);
    }

    const user = findUserByCredentials(db, req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });
    res.cookie(tokenCookieName, token, cookieOptions());
    return res.json({ token, user });
  });

  app.post("/api/auth/logout", (_req, res) => {
    res.clearCookie(tokenCookieName, cookieOptions());
    res.json({ success: true });
  });

  app.get("/api/items", (req, res) => {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    res.json(getItems(db, { q, category }));
  });

  app.get("/api/items/:id", (req, res) => {
    const item = getItemById(db, req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json(item);
  });

  app.post("/api/items", (req, res) => {
    const missing = requiredFields(req.body, ["title", "category", "description", "location"]);
    if (missing.length > 0) {
      return badRequest(res, missing);
    }

    if (!CATEGORIES.includes(req.body.category)) {
      return res.status(400).json({ message: "Invalid category", allowedCategories: CATEGORIES });
    }

    const item = createItem(db, {
      title: req.body.title.trim(),
      category: req.body.category,
      description: req.body.description.trim(),
      location: req.body.location.trim()
    });

    return res.status(201).json(item);
  });

  app.patch("/api/items/:id/claim", (req, res) => {
    const missing = requiredFields(req.body, ["answer"]);
    if (missing.length > 0) {
      return badRequest(res, missing);
    }

    const result = claimItem(db, req.params.id, req.body.answer);
    if (!result.item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    if (!result.matched) {
      return res.status(403).json({ success: false, message: "Incorrect security answer", item: result.item });
    }

    return res.json({ success: true, item: result.item });
  });

  app.get("/api/profile", (_req, res) => {
    res.json(getProfileWithRewards(db));
  });

  app.post("/api/profile/redeem/:rewardId", (req, res) => {
    const result = redeemReward(db, req.params.rewardId);
    if (result.status === "not-found") {
      return res.status(404).json({ success: false, message: "Reward not found" });
    }

    if (result.status === "insufficient") {
      return res.status(400).json({ success: false, message: "Insufficient points", points: result.points });
    }

    return res.json({ success: true, points: result.points });
  });

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    res.status(500).json({ message });
  });

  return app;
}
function requiredFields(body: unknown, fields: string[]): string[] {
  if (!body || typeof body !== "object") {
    return fields;
  }

  const record = body as Record<string, unknown>;
  return fields.filter((field) => typeof record[field] !== "string" || record[field].trim().length === 0);
}

function badRequest(res: Response, fields: string[]) {
  return res.status(400).json({ message: "Missing required fields", fields });
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000
  };
}
