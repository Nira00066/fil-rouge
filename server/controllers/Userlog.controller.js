const db = require("../config/db.config");
const { verifinscription, verifConnexion } = require("../service/servivesUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const eventDao = require("../dao/eventDao");



exports.getAll = async (req, res) => {
  try {
    const events = await eventDao.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
};
// je me suis troper j'ai mis le dao de l'event et no de user

exports.postInscription = async (req, res) => {
  console.log("postInscription");
  const { email, password, CopyPassword } = req.body;

  verifinscription(email, password, CopyPassword);

  try {
    const [existing] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      // correction: length et pas lengh
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const Hashpassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO user (email, hashed_password) VALUES (?, ?)",
      [email, Hashpassword]
    );
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
    console.log("postInscription");
  }
};

exports.postConnexion = async (req, res) => {
  console.log("postConnexion");
  const { email, password } = req.body;

  try {
    // Verification que ton utilisateur sois existant !

    const [row] = await db.execute("SELECT * FROM user WHERE email = ? ", [
      email,
    ]);

    if (row.length === 0) {
      return res.status(400).json({ message: "utilisateur non trouvé" });
    }
    // Recuperation du premiers elements sortis lors de la requete
    const user = row[0];

    verifConnexion(email, password, user);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
    console.log("postConnexion");
  }
};
