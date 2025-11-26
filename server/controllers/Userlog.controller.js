const { v4: uuidv4 } = require("uuid");
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
  const user = req.body;
  try {

    //  Vérification de l'email si elle existe déjà
    const existingUser = await userDao.getUserByEmail(user.email);
    
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // mots de passe hashed 
    const hashed = await bcrypt.hash(user.password, 10);


    // creation de ton user pour le dao
    await userDao.createUser({
      name: user.prenom,
      lastname: user.nom,
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
  try {
    console.log("postConnexion");
    
    // ⚡ Grâce à verifConnexion, req.user est déjà défini
    const user = req.user;

    const token = jwt.sign(
      { id: user.id,name : user.name, nom : user.lastname, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Connexion réussie 🎉",
      token,
    });
  } catch (err) {
    console.error("Erreur dans postConnexion:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// supprimer un utilisateur comme l'event avec un delais il sera cacher pour le temps impartie et sous 30 jours surpprimer réelement
