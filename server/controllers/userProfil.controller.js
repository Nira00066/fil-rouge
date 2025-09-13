const db = require("../config/db.config");

exports.getProfilId = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;

  if (isNaN(id) || id !== userId) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const [users] = await db.execute("SELECT * FROM user WHERE id = ?", [id]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.modifProfilId = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;
  const { name, lastname, email, profile_picture_url, location_id } = req.body;

  if (isNaN(id) || id !== userId) {
    return res.status(400).json({ message: "ID invalide" });
  }

  // Crée un tableau de champs et valeurs à mettre à jour
  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }
  if (lastname !== undefined) {
    fields.push("lastname = ?");
    values.push(lastname);
  }
  if (email !== undefined) {
    fields.push("email = ?");
    values.push(email);
  }
  if (profile_picture_url !== undefined) {
    fields.push("profile_picture_url = ?");
    values.push(profile_picture_url);
  }
  if (location_id !== undefined) {
    fields.push("location_id = ?");
    values.push(location_id);
  }

  // Si aucun champ à mettre à jour
  if (fields.length === 0) {
    return res
      .status(400)
      .json({ message: "Aucun champ fourni pour la mise à jour" });
  }

  // Ajoute l'ID à la fin des valeurs pour le WHERE
  values.push(id);

  const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;

  try {
    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Profil mis à jour" });
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
    const [users] = await db.execute("DELECT FROM user WHERE id = ? "[id]);

    if (users.affectedRows === 0) {
      res.status(400).json({ message: " Errer Id non corrspondant au token " });
    }
    res.json({ message: "Profil supprimer" });
  } catch {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
