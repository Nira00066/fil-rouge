const bcrypt = require("bcrypt");

function verifinscription(email, password, CopyPassword) {


  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }
  
  if (password !== CopyPassword) {
    return res
      .status(400)
      .json({ error: "Les mots de passe ne correspondent pas" });
  }
  return true;
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

module.exports = { verifinscription, verifConnexion };
