const db = require("../config/db.config");

class ImageDAO {
  // Ajoute une nouvelle image
  static async addImage(main_url, secondary_url = null) {
    const [result] = await db.execute(
      `INSERT INTO event_image (main_url, secondary_url) VALUES (?, ?)`,
      [main_url, secondary_url]
    );
    return result;
  }

  // Met à jour une image existante
  static async updateImage(id, main_url, secondary_url = null) {
    const [result] = await db.execute(
      `UPDATE event_image SET main_url = ?, secondary_url = ? WHERE id = ?`,
      [main_url, secondary_url, id]
    );
    return result;
  }

  // Récupère une image
  static async getImageById(id) {
    const [rows] = await db.execute(`SELECT * FROM event_image WHERE id = ?`, [id]);
    return rows[0];
  }
}

module.exports = ImageDAO;
