const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User, Favorite } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token;

const userTest = {
  username: "testuser",
  email: "testuser@gmail.com",
  password: "usertest1",
};

beforeAll(async () => {
  try {
    const user = await User.create(userTest);
    access_token = signToken({ id: user.id });
  } catch (err) {
    console.log(err, "<<< err in beforeAll");
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Favorite.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("GET /cards", () => {
  test("200 success get cards", async () => {
    const response = await request(app)
      .get("/cards")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("401 get cards with invalid token", async () => {
    const response = await request(app)
      .get("/cards")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("401 get cards without token", async () => {
    const response = await request(app).get("/cards");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /cards/:id", () => {
  test("200 success get cards by id", async () => {
    const response = await request(app)
      .get("/cards/6983839")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("400 get card detail with wrong card id", async () => {
    const response = await request(app)
      .get("/cards/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "No card matching was found in the database"
    );
  });

  test("401 get card detail with invalid token", async () => {
    const response = await request(app)
      .get("/cards")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("POST /cards/favorite/add/:cardId", () => {
  test("200 success POST favorite card", async () => {
    const response = await request(app)
      .post("/cards/favorite/add/23771716")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("userId", expect.any(Number));
    expect(response.body).toHaveProperty("cardId", expect.any(Number));
    expect(response.body).toHaveProperty("stock", 0);
  });

  test("400 post favorite card with invalid card id", async () => {
    const response = await request(app)
      .post("/cards/favorite/add/2")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "No card matching was found in the database"
    );
  });

  test("401 post favorite card with invalid token", async () => {
    const response = await request(app)
      .post("/cards/favorite/add/23771716")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /cards/favorite", () => {
  test("200 success GET favorite card", async () => {
    const response = await request(app)
      .get("/cards/favorite")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("401 GET favorite card with invalid token", async () => {
    const response = await request(app)
      .get("/cards/favorite")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("PUT /cards/favorite/edit/:favoriteId", () => {
  test("200 success PUT favorite card", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message", "Stock updated");
  });

  test("401 PUT favorite card with invalid token", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/1")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("404 PUT favorite card with invalid id card", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/5")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Favorite Card not found");
  });
});

describe("DELETE /cards/favorite/delete/:favoriteId", () => {
  test("404 PUT favorite card with invalid id card", async () => {
    const response = await request(app)
      .delete("/cards/favorite/delete/5")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Favorite Card not found");
  });

  test("200 success PUT favorite card", async () => {
    const response = await request(app)
      .delete("/cards/favorite/delete/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Favorite Card deleted");
  });

  test("401 PUT favorite card with invalid token", async () => {
    const response = await request(app)
      .delete("/cards/favorite/delete/1")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
