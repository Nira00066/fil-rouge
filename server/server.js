const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db.config");
const userRoutes = require("./routes/Users");
const eventRoutes = require("./routes/event");
const imagesRoutes = require("./routes/image");
const errorHandler = require('./middleware/error.middleware');

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, // ✅ on désactive la CSP en dev
    crossOriginEmbedderPolicy: false,
  })
);

app.use("/images", express.static(path.join(__dirname, "../images")));


// routes API
app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api/images", imagesRoutes);

// Middleware pour les routes non trouvées (404)
app.use((req, res, next) => {
    // Si la requête arrive ici, aucune route n'a géré la demande
    res.status(404).json({
        success: false,
        status: 404,
        message: `Ressource non trouvée pour l'URL: ${req.originalUrl}`
    });
});
app.use(errorHandler);
// démarrage
app.listen(PORT, () => {
  db.connect();
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});