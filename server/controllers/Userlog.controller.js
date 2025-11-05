const db = require("../config/db.config");
const { verifConnexion } = require("../service/servivesUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../dao/userDao");

// retour tous les users de la db
exports.getAll = async (req, res) => {
  try {
    const users = await userDao.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
};

//  retour le userid du http
exports.getuserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userDao.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "évenement non trouvé! " });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error userId ", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
/*
http://localhost:3000/inscription
{
  "email":"exemple2@gmail.com",
  "password":"test1234",
  "CopyPassword":"test1234"
}
  test creation user reussi 
*/

exports.postInscription = async (req, res) => {
  try {
    const user = req.body;

    // 1️⃣ Vérifie si l'email existe déjà
    const existingUser = await userDao.getUserByEmail(user.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // 2️⃣ Hash du mot de passe
    const hashed = await bcrypt.hash(user.password, 10);

    // 3️⃣ Création du user via DAO
    await userDao.createUser({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      hashed,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur dans postInscription:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

/*
http://localhost:3000/connexion
{
  "email":"exemple@gmail.com",
  "password":"test1234"
}
connection Valider retour token 
*/

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

// supprimer un utilisateur comme l'event avec un delais il sera cacher pour le temps impartie et sous 30 jours surpprimer réelement
