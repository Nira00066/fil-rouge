const express = require("express");
const db = require("./config/db.config");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const UsersRouter = require('./routes/Users')

const PORT = process.env.PORT ;
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

// app.use('/home')
// app.use('/users', UsersRouter)
// app.use('/create')


// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
