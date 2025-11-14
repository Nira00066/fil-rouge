const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const ImageController = require("../controllers/image.controller");

// 📸 Upload nouvelle image
router.post("/upload-image", upload.single("image"), ImageController.uploadImage);

// 🧩 Mettre à jour une image existante
router.put("/update-image/:id", upload.single("image"), ImageController.updateImage);

module.exports = router;
