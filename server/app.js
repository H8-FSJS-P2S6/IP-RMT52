require("dotenv").config();

// const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;

// const corsMiddleware = require("./middlewares/cors");
// app.use(corsMiddleware);

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MonsterController = require("./controllers/MonsterController");
const UserController = require("./controllers/UserController");
const UserFavController = require("./controllers/UserFavController");

const authentication = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandlers");
const gemini = require("./helpers/gemini");

app.post("/gemini", async (req, res, next) => {
  try {
    const { monster1, monster2 } = req.body;
    let data = await gemini(monster1, monster2);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

app.post("/login", UserController.login);
app.post("/login/google", UserController.googleLogin);
app.post("/register", UserController.register);

app.use(authentication);
app.get("/monster", MonsterController.getAllMonster);
app.get("/monster/:id", MonsterController.getPerMonster);
app.patch(
  "/monster/:id/imgUrl",
  upload.single("file"),
  MonsterController.uploadImgById
);
app.get("/favorites", UserFavController.getFavMonster);
app.post("/favorites", UserFavController.addFavMonster);
app.delete("/favorites/:monsterId", UserFavController.delFavMonster);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT} with CORS enabled`);
});
