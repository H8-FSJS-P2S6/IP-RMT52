if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const UserController = require("./controllers/UserController");
const CardController = require("./controllers/CardController");
const authentication = require("./middlewares/authentication");

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
app.get("/randomcard", CardController.randomCard);

app.post("/minigames", CardController.minigames);

app.use(errorHandler);

module.exports = app;
