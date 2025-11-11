const UserDAO = require("../dao/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function verifInscription(req, res, next) {
  const user = req.body;

  // Vérifie si les champs obligatoires sont présents
  if (
    !user.email ||
    !user.password ||
    !user.CopyPassword ||
    !user.name ||
    !user.lastname
  ) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  if (typeof user.name !== "string" || typeof user.lastname !== "string") {
    return res
      .status(400)
      .send("nom et prénom doivent être des chaines de caractères");
  }
  // Regex email (simple et fiable)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(user.email)) {
    return res.status(400).json({ error: "Adresse e-mail invalide" });
  }

  // Vérifie la correspondance des mots de passe
  if (user.password !== user.CopyPassword) {
    return res
      .status(400)
      .json({ error: "Les mots de passe ne correspondent pas" });
  }

  // Optionnel : check de longueur ou sécurité du mot de passe
  if (user.password.length < 8) {
    return res
      .status(400)
      .json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
  }

  // Si tout est bon :
  next();
}
async function verifConnexion(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation basique
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // 2️⃣ Vérifie si l'utilisateur existe
    const user = await UserDAO.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // 3️⃣ Vérifie le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // 4️⃣ Vérifie si la clé JWT est dispo (juste au cas où)
    if (!process.env.JWT_SECRET) {
      console.error("⚠️  JWT_SECRET manquant dans .env");
      return res.status(500).json({ message: "Erreur serveur (clé JWT manquante)" });
    }

    // ✅ Tout est bon → on stocke l'utilisateur dans req pour le contrôleur suivant
    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur dans verifConnexion:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}


module.exports = { verifInscription, verifConnexion };
