const db = require("../config/db.config");
const userDao = require("../dao/userDao");

exports.getallUser = async (req, res) => {
  try {
    const users = await userDao.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getProfilId = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.id);

  if (isNaN(id) || id !== userId) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const user = await userDao.getUserById(userId);

    if (user.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ user: user[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.modifProfilId = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  if (id !== userId) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  try {
    const result = await userDao.updateUserById(id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Aucune modification effectuée" });
    }

    res.json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//  ! ici j'aurais besoin de l'aide de natacha pour bien me l'expliquer le update 

exports.suppresionProfil = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;
  if (isNaN(id) || id !== userId) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const user = await userDao.deleteUserById(userId);

    if (user.affectedRows === 0) {
      res.status(400).json({ message: " Errer Id non corrspondant au token " });
    }
    res.json({ message: "Profil supprimer" });
  } catch {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
