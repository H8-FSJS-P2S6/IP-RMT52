const { Favorite } = require("../models");
const axios = require("axios");

class CardController {
  static async getAllCard(req, res, next) {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const cardsFromApi = response.data.data;

      const processedCards = cardsFromApi.map((card) => ({
        id: card.id,
        name: card.name,
        type: card.type,
        frameType: card.frameType,
        desc: card.desc,
        atk: card.atk || null,
        def: card.def || null,
        level: card.level || null,
        race: card.race || null,
        archetype: card.archetype || null,
        attribute: card.attribute || null,
        image_url: card.card_images[0]?.image_url || null,
        price: card.card_prices[0]?.cardmarket_price || null,
      }));

      res.status(200).json(processedCards);
    } catch (err) {
      next(err);
    }
  }

  static async getCardById(req, res, next) {
    const { id } = req.params;
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
      );
      if (!response) {
        throw { name: "NotFound", message: "Card not found" };
      }
      const card = response.data.data[0];

      const cardDetail = {
        id: card.id,
        name: card.name,
        type: card.type,
        frameType: card.frameType,
        desc: card.desc,
        atk: card.atk || null,
        def: card.def || null,
        level: card.level || null,
        race: card.race || null,
        archetype: card.archetype || null,
        attribute: card.attribute || null,
        image_url: card.card_images[0]?.image_url || null,
        price: card.card_prices[0]?.cardmarket_price || null,
      };

      res.status(200).json(cardDetail);
    } catch (err) {
      next(err);
    }
  }

  static async getFavorites(req, res, next) {
    try {
      const favorites = await Favorite.findAll({
        where: {
          userId: req.user.id,
        },
      });
      const data = [];
      for (const favorite of favorites) {
        const response = await axios.get(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${favorite.cardId}`
        );
        const card = response.data.data[0];

        const cardDetail = {
          id: card.id,
          name: card.name,
          type: card.type,
          frameType: card.frameType,
          desc: card.desc,
          atk: card.atk || null,
          def: card.def || null,
          level: card.level || null,
          race: card.race || null,
          archetype: card.archetype || null,
          attribute: card.attribute || null,
          image_url: card.card_images[0]?.image_url || null,
          price: card.card_prices[0]?.cardmarket_price || null,
        };

        data.push(cardDetail);
      }

      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  }

  static async createFavorite(req, res, next) {
    try {
      const favorite = await Favorite.create({
        userId: req.user.id,
        cardId: req.params.cardId,
      });
      
      res.status(200).json(favorite);
    } catch (err) {
      next(err);
    }
  }

  static async updateFavorite(req, res, next) {
    try {
      const favorite = await Favorite.findByPk(req.params.favoriteId);
      if (!favorite) {
        throw { name: "NotFound", message: "Favorite Card not found" };
      }
      await favorite.update({
        stock: req.body.stock,
      });

      res.status(200).json({ data: favorite, message: "Stock updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const favorite = await Favorite.findByPk(req.params.favoriteId);
      if (!favorite) {
        throw { name: "NotFound", message: "Favorite Card not found" };
      }
      await favorite.destroy();

      res.status(200).json({ message: "Favorite Card deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CardController;
