const { Card } = require("../models");
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
        attribute: card.attribute || null,
        image_url: card.card_images[0]?.image_url || null,
        price: card.card_prices[0]?.cardmarket_price || null,
      }));

      const cards = await Card.findAll();

      res.status(200).json(processedCards.concat(cards));
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
        attribute: card.attribute || null,
        image_url: card.card_images[0]?.image_url || null,
        price: card.card_prices[0]?.cardmarket_price || null,
      };

      res.status(200).json(cardDetail);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CardController;
