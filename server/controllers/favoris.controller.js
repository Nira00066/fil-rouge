const favoritesDAO = require("../dao/favorisDao");
const favoritesDao = require("../dao/favorisDao");

exports.addFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // vient du token
    const eventId = parseInt(req.params.eventId);

    if (isNaN(eventId)) {
      return res.status(400).json({ message: "ID d'événement invalide" });
    }

    const result = await favoritesDao.addFavorites(userId, eventId);
    console.log("Résultat SQL :", result);
    res.status(201).json({ message: "Événement ajouté aux favoris !" });
  } catch (err) {
    console.error("Erreur addFavorite:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = parseInt(req.params.eventId);

    const result = await favoritesDao.removeFavorites(userId, eventId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favori non trouvé" });
    }

    res.json({ message: "Événement retiré des favoris" });
  } catch (err) {
    console.error("Erreur removeFavorite:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await favoritesDAO.getFavoritesByUser(userId);
    res.json(favorites);
  } catch (err) {
    console.error("Erreur getFavorites:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
