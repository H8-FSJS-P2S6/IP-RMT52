const openAI = require("../helpers/openai");
const { Favorite } = require("../models");
const axios = require("axios");

class CardController {
  static async getAllCard(req, res, next) {
    try {
      const {
        query: { archetype, name, sort = "asc", page = 1, pageSize = 10 },
      } = req;

      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      let cardsFromApi = response.data.data;

      // Filter by archetype if provided
      if (archetype) {
        cardsFromApi = cardsFromApi.filter(
          (card) => card.archetype === archetype
        );
      }

      // Search by name if provided
      if (name) {
        cardsFromApi = cardsFromApi.filter((card) =>
          card.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Sort by level if provided
      if (sort === "asc") {
        cardsFromApi.sort((a, b) => (a.level || 0) - (b.level || 0));
      } else if (sort === "desc") {
        cardsFromApi.sort((a, b) => (b.level || 0) - (a.level || 0));
      }

      // Pagination
      const pageNumber = parseInt(page, 10) || 1;
      const pageSizeNumber = parseInt(pageSize, 10) || 10;
      const totalCards = cardsFromApi.length;
      const offset = (pageNumber - 1) * pageSizeNumber;
      const paginatedCards = cardsFromApi.slice(
        offset,
        offset + pageSizeNumber
      );

      const processedCards = paginatedCards.map((card) => ({
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

      res.status(200).json({
        totalCards,
        totalPages: Math.ceil(totalCards / pageSizeNumber),
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        cards: processedCards,
      });
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
          favoriteId: favorite.id,
          stock: favorite.stock,
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

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createFavorite(req, res, next) {
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${req.params.cardId}`
      );
      const responseServer = response.data.data[0];
      const sameCard = await Favorite.findOne({
        where: {
          cardId: responseServer.id,
        },
      });
      if (sameCard) {
        throw {
          name: "Forbidden",
          message: "Can't add same card to favorites",
        };
      }
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

  static async getCardArchetype(req, res, next) {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/archetypes.php"
      );

      let archetypeApi = response.data.map((archetype) => ({
        name: archetype.archetype_name,
      }));
      res.status(200).json(archetypeApi);
    } catch (err) {
      next(err);
    }
  }

  static async randomCard(req, res, next) {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/randomcard.php"
      );

      const randomCard = response.data.data[0];

      const guessRandomCard = {
        name: randomCard.name,
        type: randomCard.type,
        frameType: randomCard.frameType,
        race: randomCard.race,
        desc: randomCard.desc,
        archetype: randomCard.archetype,
        card_images: randomCard.card_images[0].image_url_cropped,
        cardtype: randomCard.humanReadableCardType,
        atk: randomCard.atk || null,
        def: randomCard.def || null,
        level: randomCard.level || null,
        attribute: randomCard.attribute || null,
        rarity: randomCard.card_sets[0].set_rarity || null,
      };
      res.status(200).json(guessRandomCard);
    } catch (err) {
      next(err);
    }
  }

  static async minigames(req, res, next) {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/randomcard.php"
      );
      const randomCard = response.data.data[0];

      const guessRandomCard = {
        name: randomCard.name,
        type: randomCard.type,
        frameType: randomCard.frameType,
        race: randomCard.race,
        desc: randomCard.desc,
        archetype: randomCard.archetype,
        card_images: randomCard.card_images[0].image_url_cropped,
        cardtype: randomCard.humanReadableCardType,
        atk: randomCard.atk || null,
        def: randomCard.def || null,
        level: randomCard.level || null,
        attribute: randomCard.attribute || null,
        rarity: randomCard.card_sets[0].set_rarity || null,
      };

      const hint = await openAI(guessRandomCard);
      res.status(200).json({
        hint,
        cardName: guessRandomCard.name,
        cardImage: guessRandomCard.card_images,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CardController;
