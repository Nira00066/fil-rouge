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

/*
a coter de Author
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJleGVtcGxlMkBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJpYXQiOjE3NjExMzE1NzcsImV4cCI6MTc2MTEzNTE3N30.ySG9dRMX7cvZUsFx9ijpMrv6H8K_gHelh-t1oeDGGz4

*/

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
  } catch (err) {
    console.error("Erreur suppressionProfil:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du profil" });
  }
};
