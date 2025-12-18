const db = require("../config/db.config");

class UserDAO {
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
      const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [userId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Erreur dans getUserById:", err);
      throw err;
    }
  }

  static async deleteUserById(userId) {
    try {
      const [result] = await db.execute("DELETE FROM user WHERE id = ?", [userId]);
      return result;
    } catch (err) {
      console.error("Erreur dans deleteUserById:", err);
      throw err;
    }
  }

  static async updateUserById(userId, data) {
    try {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) return { affectedRows: 0 };

      const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
      values.push(userId);

      const [result] = await db.execute(sql, values);
      return result;
    } catch (err) {
      console.error("Erreur dans updateUserById:", err);
      throw err;
    }
  }

  static async getUserByEmail(email) {
    try {
      const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Erreur dans getUserByEmail:", err);
      throw err;
    }
  }

  static async createUser({ name, lastname, email, hashed }) {
    try {
      const [result] = await db.execute(
        "INSERT INTO user (name, lastname, email, hashed_password) VALUES (?, ?, ?, ?)",
        [name, lastname, email, hashed]
      );
      return result.insertId; // 👈 renvoie l’ID du user créé
    } catch (err) {
      console.error("Erreur dans createUser:", err);
      throw err;
    }
  }
}

module.exports = UserDAO;
