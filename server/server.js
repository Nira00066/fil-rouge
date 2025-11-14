const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db.config");
const userRoutes = require("./routes/Users");
const eventRoutes = require("./routes/event");
const imagesRoutes = require("./routes/image");

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
app.use("/", eventRoutes);
app.use("/api/images", imagesRoutes);


// démarrage
app.listen(PORT, () => {
  db.connect();
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});