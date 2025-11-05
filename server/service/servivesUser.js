const bcrypt = require("bcrypt");

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

async function verifConnexion(email, password, user) {
  if (!email || !password) {
    throw new Error("Email et Mot de passe requis");
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

  if (!isPasswordValid) {
    throw new Error("mot de passe incorrect");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET non défini dans .env");
  }
  return true;
}

module.exports = { verifInscription, verifConnexion };
