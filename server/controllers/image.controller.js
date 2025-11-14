const ImageDAO = require("../dao/imageDao");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image envoyée" });
    }

    const main_url = `images/events/${req.file.filename}`;
    const result = await ImageDAO.addImage(main_url);

    res.status(201).json({
      message: "✅ Image uploadée avec succès",
      imageId: result.insertId,
      imageUrl: main_url,
    });
  } catch (err) {
    console.error("💥 Erreur uploadImage :", err);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'upload", error: err.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ message: "Aucune image envoyée" });

    const main_url = `images/events/${req.file.filename}`;
    await ImageDAO.updateImage(id, main_url);

    res.status(200).json({ message: "✅ Image mise à jour avec succès", imageUrl: main_url });
  } catch (err) {
    console.error("💥 Erreur updateImage :", err);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour", error: err.message });
  }
};
