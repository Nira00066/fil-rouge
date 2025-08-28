const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    res.status(500).send("erreu:" + err.message);
  }
});

app.post("/inscription", async (req, res) => {
  const { email, password, CopyPassword } = req.body;
  if (!email || !password) {
    return res.status(400).json({ errer: "Eamil et mot de passe et requis " });
  }
  if (password !== CopyPassword) {
    return res.status(400).json({
      errer: "Le mot de passe et la confirmation ne correspondent pas",
    });
  }
  try {
    const [existing] = await db.execute("SELECT * FROM  user WHERE email = ?", [
      email,
    ]);
    if (existing.lenght > 0) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }
    const Hashpassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO user (email,Hashpassword) VALUES ($1,$2)", [
      email,
      Hashpassword,
    ]);
    res.status(201).json({ message: "Utilisateur créé " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur Server" });
  }
});

app.post("/connexion", async (req, res) => {
  // recuperer email et mot de passe
  const { email, password } = req.body;
  // verifier si email et mot de passe sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }
  try {
    const [row] = await db.execute(
      "SELECT * FROM user WHERE email = ? ",
      email
    );
    if (row.length === 0) {
      return res.status(400).json({ message: "utilisateur non trouvé" });
    }
    const user = row[0];

    const isPasswordValid = await bcrypt.compare(password, user.Hashpassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "mot de passe incorrect" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await db.execute("SELECT * FROM user WHERE id = ?", [id]);
    if (row.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const user = row[0];
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
