const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favorite.controller");
const authenticateToken = require("../middleware/authenticateToken");

// Ajouter un favori
router.post("/favorites/:eventId", authenticateToken, FavoriteController.addFavorite);

// Supprimer un favori
router.delete("/favorites/:eventId", authenticateToken, FavoriteController.removeFavorite);

// Voir mes favoris
router.get("/favorites", authenticateToken, FavoriteController.getFavorites);

module.exports = router;
