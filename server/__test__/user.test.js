const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("User Routes Test", () => {
  describe("Membuat testing untuk register (POST /register)", () => {
    test("Berhasil register", async () => {
      const user = {
        username: "foresto",
        email: "forestoay@gmail.com",
        password: "test1234",
      };
      const response = await request(app).post("/register").send(user);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("email", user.email);
    });

    test("Gagal register karena email tidak ada", async () => {
      const response = await request(app).post("/register").send({
        username: "test",
        password: "qweqwe",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("Gagal register karena email tidak unik", async () => {
      const response = await request(app).post("/register").send({
        username: "awsd",
        email: "forestoay@gmail.com",
        password: "test1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email must be unique");
    });

    test("Gagal register karena salah format email", async () => {
      const response = await request(app).post("/register").send({
        username: "awsde",
        email: "forestoay123",
        password: "test1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid email format");
    });

    test("Gagal register karena password kurang dari 5 karakter", async () => {
      const response = await request(app).post("/register").send({
        username: "test",
        email: "test@gmail.com",
        password: "1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "The password must have a minimum of 5 characters"
      );
    });
  });

  describe("Membuat testing untuk login (POST /login)", () => {
    test("Berhasil login", async () => {
      const user = {
        username: "foresto",
        email: "forestoay@gmail.com",
        password: "test1234",
      };
      const response = await request(app).post("/login").send(user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });

    test("Gagal login karena salah email / password", async () => {
      const response = await request(app).post("/login").send({
        email: "forestoay@gmail.com",
        password: "hahahehe",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password"
      );
    });
  });
});
