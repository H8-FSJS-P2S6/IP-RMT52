const { test, expect, afterAll, describe } = require("@jest/globals");
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
  describe("POST /register - create new user", () => {
    test("201 Success register - should create new User", async () => {
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

    test("400 Failed register - should return error if username is null", async () => {
      const response = await request(app).post("/register").send({
        email: "testing@gmail.com",
        password: "123456",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Username is required");
    });

    test("400 Failed register - should return error if password is null", async () => {
      const response = await request(app).post("/register").send({
        username: "test",
        email: "testing@gmail.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });

    test("400 Failed register - should return error if email is null", async () => {
      const response = await request(app).post("/register").send({
        username: "test",
        password: "qweqwe",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("400 Failed register - should return error if email is already exists", async () => {
      const response = await request(app).post("/register").send({
        username: "awsd",
        email: "forestoay@gmail.com",
        password: "test1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email must be unique");
    });

    test("400 Failed register - should return error if wrong email format", async () => {
      const response = await request(app).post("/register").send({
        username: "awsde",
        email: "forestoay123",
        password: "test1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid email format");
    });

    test("400 Failed register - should return an error if the password has less than 5 characters", async () => {
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

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", async () => {
      const user = {
        username: "foresto",
        email: "forestoay@gmail.com",
        password: "test1234",
      };
      const response = await request(app).post("/login").send(user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });

    test("401 Failed login - email is empty", async () => {
      const response = await request(app).post("/login").send({
        password: "hahahehe",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("401 Failed login - password is empty", async () => {
      const response = await request(app).post("/login").send({
        email: "forestoay23@gmail.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });

    test("401 Failed login - invalid email or password", async () => {
      const response = await request(app).post("/login").send({
        email: "forestoay23@gmail.com",
        password: "hahahehe",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password"
      );
    });

    test("401 Failed login - invalid email or password", async () => {
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
