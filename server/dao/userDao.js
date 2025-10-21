const db = require("../config/db.config");

class userDao {
  static async getAllUsers() {
    try {
      const [rows] = await db.execute("SELECT * FROM user");
      return rows;
    } catch (err) {
      console.error("Erreur dans getAllUsers:", err);
      throw err;
    }
  }

  static async getUserById(userId) {
    try {
      const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [
        userId,
      ]);
      return rows;
    } catch (err) {
      console.error("Erreur dans getUserById:", err);
      throw err;
    }
  }

  static async deleteUserById(userId) {
    try {
      const [result] = await db.execute("DELETE FROM user WHERE id = ? ", [
        userId,
      ]);
      return result;
    } catch (err) {
      console.error("Erreur dans deleteUserById:", err);
      throw err;
    }
  }
   static async updateUserById(userId, data) {
    const fields = [];
    const values = [];

    // Logique SQL (pas métier)
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      return { affectedRows: 0 };
    }

    const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
    values.push(userId);

    const [result] = await db.execute(sql, values);
    return result;
  }
}

module.exports = userDao;
