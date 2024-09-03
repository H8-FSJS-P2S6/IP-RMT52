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

// Need login first to access
app.get("/cards", CardController.getAllCard);

app.get("/cards/favorite", CardController.getFavorites);

app.get("/cards/:id", CardController.getCardById);

app.post("/cards/favorite/add/:cardId", CardController.createFavorite);
app.put("/cards/favorite/edit/:favoriteId", CardController.updateFavorite);
app.delete("/cards/favorite/delete/:favoriteId", CardController.deleteFavorite);

app.get("/archetype", CardController.getCardArchetype);

app.use(errorHandler);

module.exports = app;
