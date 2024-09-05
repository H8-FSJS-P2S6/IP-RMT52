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
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", expect.any(Number));
    expect(response.body).toHaveProperty("pageSize", expect.any(Number));
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  test("200 success get cards with archetype filter", async () => {
    const response = await request(app)
      .get("/cards?archetype=Sky Striker")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", expect.any(Number));
    expect(response.body).toHaveProperty("pageSize", expect.any(Number));
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  test("200 success get cards with search by name", async () => {
    const response = await request(app)
      .get("/cards?name=blue-eyes")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", expect.any(Number));
    expect(response.body).toHaveProperty("pageSize", expect.any(Number));
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  test("200 success get cards with search by name", async () => {
    const response = await request(app)
      .get("/cards?sort=desc")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", expect.any(Number));
    expect(response.body).toHaveProperty("pageSize", expect.any(Number));
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  test("200 success get cards with current pages", async () => {
    const response = await request(app)
      .get("/cards?page=5")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", 5);
    expect(response.body).toHaveProperty("pageSize", expect.any(Number));
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  test("200 success get cards with limit page size", async () => {
    const response = await request(app)
      .get("/cards?pageSize=5")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalCards", expect.any(Number));
    expect(response.body).toHaveProperty("totalPages", expect.any(Number));
    expect(response.body).toHaveProperty("currentPage", expect.any(Number));
    expect(response.body).toHaveProperty("pageSize", 5);
    expect(Array.isArray(response.body.cards)).toBeTruthy();
    expect(response.body.cards.length).toBe(5);
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
      .post("/cards/favorite/add/36693940")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("userId", expect.any(Number));
    expect(response.body).toHaveProperty("cardId", expect.any(Number));
    expect(response.body).toHaveProperty("stock", 0);
  });

  test("403 can't POST the same card to favorite", async () => {
    const response = await request(app)
      .post("/cards/favorite/add/36693940")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Can't add same card to favorites"
    );
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

describe("GET /cards/favorite/:id", () => {
  test("200 success GET one favorite card", async () => {
    const response = await request(app)
      .get("/cards/favorite/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("userId", expect.any(Number));
    expect(response.body).toHaveProperty("cardId", expect.any(Number));
  });

  test("401 GET favorite card with invalid token", async () => {
    const response = await request(app)
      .get("/cards/favorite/1")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("404 GET one favorite card with invalid id", async () => {
    const response = await request(app)
      .get("/cards/favorite/3")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Favorite Card not found");
  });
});

describe("PUT /cards/favorite/edit/:favoriteId", () => {
  test("200 success PUT favorite card", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        stock: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message", "Stock updated");
  });

  test("400 PUT stock can't be negative", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        stock: -1,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Stock cannot be negative");
  });

  test("401 PUT favorite card with invalid token", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/1")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      )
      .send({
        stock: 3,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("404 PUT favorite card with invalid id card", async () => {
    const response = await request(app)
      .put("/cards/favorite/edit/5")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        stock: 3,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Favorite Card not found");
  });
});

describe("DELETE /cards/favorite/delete/:favoriteId", () => {
  test("404 DELETE favorite card with invalid id card", async () => {
    const response = await request(app)
      .delete("/cards/favorite/delete/5")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Favorite Card not found");
  });

  test("200 success DELETE favorite card", async () => {
    const response = await request(app)
      .delete("/cards/favorite/delete/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Favorite Card deleted");
  });

  test("401 DELETE favorite card with invalid token", async () => {
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

describe("GET /archetype", () => {
  test("200 success get archetype", async () => {
    const response = await request(app)
      .get("/archetype")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("401 get archetype with invalid token", async () => {
    const response = await request(app)
      .get("/archetype")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /randomcard", () => {
  test("200 success get randomcard", async () => {
    const response = await request(app)
      .get("/randomcard")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("frameType", expect.any(String));
    expect(response.body).toHaveProperty("type", expect.any(String));
    expect(response.body).toHaveProperty("desc", expect.any(String));
  });

  test("401 get randomcard with invalid token", async () => {
    const response = await request(app)
      .get("/randomcard")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /minigames", () => {
  test("200 success get minigames", async () => {
    const response = await request(app)
      .get("/minigames")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("hint", expect.any(String));
    expect(response.body).toHaveProperty("cardName", expect.any(String));
    expect(response.body).toHaveProperty("cardImage", expect.any(String));
  });

  test("401 get minigames with invalid token", async () => {
    const response = await request(app)
      .get("/minigames")
      .set(
        "Authorization",
        `Bearer ${access_token.substring(1, access_token.length)}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
