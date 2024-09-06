const { UserFavorite, Monster, User } = require("../models");

module.exports = class UserFavController {
  static async getFavMonster(req, res, next) {
    const { id } = req.user;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        next({ name: "NotFound", message: `User id:${id} not found` });
        return;
      }

      const favorites = await UserFavorite.findAll({
        where: { userId: id },
        include: { model: Monster },
      });

      res.status(200).json({ data: favorites, message: `success` });
    } catch (err) {
      console.log(err, "<<< err getFavMonster");
      next(err);
    }
  }

  static async addFavMonster(req, res, next) {
    const { id } = req.user;
    const { monsterId } = req.body;

    try {
      const user = await User.findByPk(id);
      console.log("userId:", user);
      if (!user) {
        next({ name: "NotFound", message: `User id:${id} not found` });
        return;
      }

      const monster = await Monster.findByPk(monsterId);
      console.log("monsterId:", monster);
      if (!monster) {
        next({
          name: "NotFound",
          message: `Monster id:${monsterId} not found`,
        });
        return;
      }

      const existingFavorite = await UserFavorite.findOne({
        where: { userId: id, monsterId },
      });
      if (existingFavorite) {
        return res
          .status(400)
          .json({ message: "Favorite monster already added" });
      }

      console.log();

      await UserFavorite.create(
        { userId: id, monsterId }
        // include: { model: Monster },
      );
      res.status(201).json({ message: "Favorite monster added successfully" });
    } catch (err) {
      console.log(err, "<<< err addFavMonster");
      next(err);
    }
  }

  static async delFavMonster(req, res, next) {
    const { id } = req.user;
    const monsterId = req.params.monsterId;

    try {
      const user = await User.findByPk(id);
      const monster = await Monster.findByPk(monsterId);
      if (!user) {
        next({ name: "NotFound", message: `User id:${id} not found` });
        return;
      }
      if (!monster) {
        next({ name: "NotFound", message: `Monster id:${id} not found` });
        return;
      }

      const result = await UserFavorite.destroy({
        where: {
          userId: id,
          monsterId,
        },
      });
      if (result === 0) {
        return next({ name: "NotFound", message: `Favorite not found` });
      }
      res.status(200).json({ message: "Favorite monster deleted" });
    } catch (err) {
      console.log(err, "<<< err delFavMonster");
      next(err);
    }
  }
};
