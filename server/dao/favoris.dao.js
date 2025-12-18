const db = require("../config/db.config");

class favoritesDAO {
  static async addFavorites(userId, eventId) {
    try {
      const [result] = await db.execute(
        "INTERT INTO favorite (user_id,event_id) VALUES (?,?)",
        [userId, eventId]
      );
      return result;
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new Error("Cet événement est déjà dans vos favoris.");
      }
      console.error("Erreur dans addFavorite:", err);
      throw err;
    }
  }

  static async removeFavorites(userId, eventId) {
    const [result] = await db.execute(
      "DELETE FROM favorite WHERE user_id = ? AND event_id = ?",
      [userId, eventId]
    );
    return result;
  }

  static async getFavoritesByUser(userId) {
    const [rows] = await db.execute(
      `SELECT e.* FROM event e
       INNER JOIN favorite f ON e.id = f.event_id
       WHERE f.user_id = ? AND e.deleted_at IS NULL`,
      [userId]
    );
    return rows;
  }
}

module.exports = favoritesDAO;