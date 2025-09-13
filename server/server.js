const express = require("express");
const db = require("./config/db.config");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoutes = require("./routes/Users");
const ValidatorToken = require("./middleware/auth");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// Vérifier la connexion
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
    return;
  }
  console.log("Connecté à MySQL ✅");
});

app.use("/", userRoutes);
// app.use('/create')

// Lancer le serveur
app.listen(PORT, () => {
  db.connect();
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
