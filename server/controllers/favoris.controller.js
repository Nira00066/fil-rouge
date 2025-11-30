const favoritesDAO = require("../dao/favorisDao");



const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};


exports.addFavorites = async (req, res, next) => { 
    try {

        const userId = req.user.id; 
        const eventId = parseInt(req.params.eventId);

        if (isNaN(eventId)) {

            return next(createError("ID d'événement invalide", 400));
        }

        const result = await favoritesDAO.addFavorites(userId, eventId);
        console.log("Résultat SQL :", result);
        
        // Statut 201 pour la création de ressource
        res.status(201).json({ message: "Événement ajouté aux favoris !" });
        
    } catch (err) {
        console.error("Erreur addFavorite:", err.message);
        // Souvent une erreur 409 Conflict (si déjà favori) ou 400 (contrainte DB)
        // On renvoie 400 pour les erreurs de contrainte ou on laisse le 500 pour les erreurs BDD.
        next(createError(err.message || "Erreur lors de l'ajout aux favoris", err.statusCode || 400));
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const eventId = parseInt(req.params.eventId);
        
        if (isNaN(eventId)) {
            return next(createError("ID d'événement invalide", 400));
        }

        const result = await favoritesDAO.removeFavorites(userId, eventId);

        if (result.affectedRows === 0) {
      
            return next(createError("Favori non trouvé à supprimer", 404));
        }

        res.json({ message: "Événement retiré des favoris" });
        
    } catch (err) {
        console.error("Erreur removeFavorite:", err);
      
        next(err); 
    }
};

exports.getFavorites = async (req, res, next) => { 
    try {
        const userId = req.user.id;
        const favorites = await favoritesDAO.getFavoritesByUser(userId);
        res.json(favorites); 
        
    } catch (err) {
        console.error("Erreur getFavorites:", err);
       
        next(err); 
    }
};