const db = require("../config/db.config");
const userDao = require("../dao/user.dao");

const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// ----------------------------------------------------------------
// Lecture (Tous les utilisateurs)
// ----------------------------------------------------------------

exports.getallUser = async (req, res, next) => {
  try {
    const users = await userDao.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err); // Passer l'erreur au middleware
  }
};

// ----------------------------------------------------------------
// Lecture (Profil Sécurisé par ID)
// ----------------------------------------------------------------

exports.getProfilId = async (req, res, next) => {
  const id = parseInt(req.params.id);
  // L'ID vérifié du token (assuré par le middleware d'auth)
  const userId = parseInt(req.user.id);

  // Vérification de sécurité: l'ID demandé doit correspondre à l'ID du token
  if (isNaN(id) || id !== userId) {
    // Renvoie 403 même si l'ID est invalide pour éviter de donner des informations inutiles
    return next(createError("Accès interdit ou ID invalide", 403));
  }

  try {
    const user = await userDao.getUserById(userId);

    if (user.length === 0) {
      return next(createError("Utilisateur non trouvé", 404));
    }

    res.json({ user: user[0] });
  } catch (err) {
    console.error(err);
    next(err); //Passer l'erreur au middleware
  }
};

// ----------------------------------------------------------------
// Modification (Profil Sécurisé)
// ----------------------------------------------------------------

exports.modifProfilId = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.id);

  if (isNaN(id)) {
    return next(createError("ID invalide", 400));
  }

  // Vérification de sécurité
  if (id !== userId) {
    return next(
      createError(
        "Accès interdit: vous ne pouvez modifier que votre propre profil",
        403
      )
    );
  }

  try {
    const result = await userDao.updateUserById(id, req.body);

    if (result.affectedRows === 0) {
      // Si la requête SQL a réussi mais n'a modifié aucune ligne (peut être un 404)
      return next(
        createError(
          "Utilisateur non trouvé ou aucune modification nécessaire",
          404
        )
      );
    }

    res.json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    next(err); // Passer l'erreur au middleware
  }
};

// ----------------------------------------------------------------
// Suppression (Profil Sécurisé)
// ----------------------------------------------------------------

exports.suppresionProfil = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;

  if (isNaN(id) || id !== userId) {
    return next(createError("Accès interdit ou ID invalide", 403));
  }

  try {
    // J'ai renommé en softDeleteUser pour suivre le contrôleur d'utilisateur,
    // assurez-vous que le DAO est correct (soft delete ou hard delete)
    const result = await userDao.softDeleteUser(userId);

    if (result.affectedRows === 0) {
      return next(
        createError("Erreur: Utilisateur non trouvé pour la suppression.", 404)
      );
    }

    // Note: Après la suppression, vous devriez probablement effacer le token côté client (Front-end)
    res.json({ message: "Profil désactivé/supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppressionProfil:", err);
    next(err); // Passer l'erreur au middleware
  }
};
