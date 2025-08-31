const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const authenticateToken = require("../middleware/auth");
const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
});

router.post("/inscription", async (req, res) => {
  const { email, password, CopyPassword } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }
  if (password !== CopyPassword) {
    return res
      .status(400)
      .json({ error: "Les mots de passe ne correspondent pas" });
  }
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
  }
});

router.post("/connexion", async (req, res) => {
  // recuperer email et mot de passe
  const { email, password } = req.body;
  // verifier si email et mot de passe sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const [row] = await db.execute("SELECT * FROM user WHERE email = ? ", [
      email,
    ]);

    if (row.length === 0) {
      return res.status(400).json({ message: "utilisateur non trouvé" });
    }
    const user = row[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "mot de passe incorrect" });
    }
    router.post("/connexion", async (req, res) => {
      // recuperer email et mot de passe
      const { email, password } = req.body;
      // verifier si email et mot de passe sont fournis
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email et mot de passe requis" });
      }

      try {
        const [row] = await db.execute("SELECT * FROM user WHERE email = ? ", [
          email,
        ]);

        if (row.length === 0) {
          return res.status(400).json({ message: "utilisateur non trouvé" });
        }
        const user = row[0];

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashed_password
        );
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
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET non défini dans .env");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/profile/user/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
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
});
router.put("/profile/user/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  if (req.user.id !== id) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  const { name, lastname, email, profile_picture_url, location_id } = req.body;

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
});





module.exports = router;
