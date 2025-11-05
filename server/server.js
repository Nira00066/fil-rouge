const express = require("express");
const db = require("./config/db.config");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const cors = require("cors");
const userRoutes = require("./routes/Users");
const eventRoutes = require("./routes/event");

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../")));

app.use("/api", userRoutes);
app.use("/", eventRoutes);
// Vérifier la connexion

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
  db.connect();
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
