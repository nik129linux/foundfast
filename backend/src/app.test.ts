import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "./app";
import { createDatabase, type AppDatabase } from "./database";

const databases: AppDatabase[] = [];

function setup() {
  const db = createDatabase(":memory:");
  databases.push(db);
  return createApp({ db, jwtSecret: "test-secret" });
}

afterEach(() => {
  while (databases.length > 0) {
    databases.pop()?.close();
  }
});
describe("FoundFast API", () => {
  it("logs in with valid credentials and sets an HttpOnly cookie", async () => {
    const app = setup();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "casanovan38@gmail.com", password: "demo123" })
      .expect(200);

    expect(response.body.user).toMatchObject({
      email: "casanovan38@gmail.com",
      name: "Valentina Rosero"
    });
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.headers["set-cookie"].join(";")).toContain("HttpOnly");
  });

  it("rejects invalid login credentials", async () => {
    const app = setup();

    await request(app)
      .post("/api/auth/login")
      .send({ email: "casanovan38@gmail.com", password: "wrong-password" })
      .expect(401);
  });

  it("filters items by search query", async () => {
    const app = setup();

    const response = await request(app).get("/api/items").query({ q: "llave" }).expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      id: "1",
      category: "Llaves",
      status: "unclaimed"
    });
  });

  it("claims an item with a correct security answer", async () => {
    const app = setup();

    const response = await request(app).patch("/api/items/1/claim").send({ answer: "negra" }).expect(200);

    expect(response.body).toMatchObject({
      success: true,
      item: {
        id: "1",
        status: "claimed",
        claims: 1
      }
    });
  });

  it("does not claim an item with an incorrect security answer", async () => {
    const app = setup();

    const response = await request(app).patch("/api/items/1/claim").send({ answer: "roja" }).expect(403);

    expect(response.body).toMatchObject({
      success: false,
      item: {
        id: "1",
        status: "unclaimed",
        claims: 0
      }
    });
  });
});
