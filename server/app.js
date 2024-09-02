if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const UserController = require("./controllers/UserController");
const CardController = require("./controllers/CardController");
const authentication = require("./middlewares/authentication");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register & Login
app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.use(authentication);
//
app.get("/cards", CardController.getAllCard);
app.post("/cards");

app.get("/cards/:id", CardController.getCardById);
app.put("/cards/:id");

app.delete("/cards/:id");

app.use(errorHandler);

module.exports = app;
