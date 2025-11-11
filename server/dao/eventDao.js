const db = require("../config/db.config");

class EventDAO {
  // Listes de tous les eventements

  static async getAllEvents() {
    const [rows] = await db.execute("SELECT * FROM event");
    return rows;
  }
  static async getAllEvents(filters = {}) {
    const { search, category, date, city } = filters;

    // 🧱 Requête de base
    let query = `
      SELECT e.*, l.city
      FROM event e
      LEFT JOIN location l ON e.location_id = l.id
      WHERE 1=1
    `;
    const params = [];

    // 🔍 Recherche texte (titre ou description)
    if (search) {
      query += " AND (e.title LIKE ? OR e.description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    // 🏷️ Catégorie (mapping du slug -> id)
    if (category && category !== "all") {
      const categoryMap = {
        competition: 1,
        rassemblement: 2,
        mecanique: 3,
        carshow: 4,
        offroad: 5,
        innovation: 6,
        culture: 7,
      };
      const categoryId = categoryMap[category];
      if (categoryId) {
        query += " AND e.category_id = ?";
        params.push(categoryId);
      }
    }

    // 📅 Filtre date (today / week / month)
    if (date && date !== "all") {
      if (date === "today") {
        query += " AND DATE(e.date_start) = CURDATE()";
      } else if (date === "week") {
        query += " AND YEARWEEK(e.date_start, 1) = YEARWEEK(CURDATE(), 1)";
      } else if (date === "month") {
        query +=
          " AND MONTH(e.date_start) = MONTH(CURDATE()) AND YEAR(e.date_start) = YEAR(CURDATE())";
      }
    }

    // 🏙️ Ville
    if (city && city !== "all") {
      query += " AND l.city = ?";
      params.push(city.charAt(0).toUpperCase() + city.slice(1)); // ex: bayonne -> Bayonne
    }

    query += " ORDER BY e.date_start ASC";

    // 🧠 Exécution de la requête
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async getEventById(id) {
    const [rows] = await db.execute("SELECT * FROM event WHERE id = ?", [id]);
    return rows[0];
  }

  // Uniquements par catégory
  static async getEventsByCategorySlug(slug) {
    try {
      const [events] = await db.execute(
        `SELECT * 
       FROM event 
       JOIN category  ON event.category_id = category.id
       WHERE category.slug = ?`,
        [slug]
      );

      return events;
    } catch (error) {
      console.error("Erreur DAO getEventsByCategorySlug:", error);
      throw error;
    }
  }

  // Selection des events par connection donc locations choisis
  static async getEventsBylocUser(user) {
    try {
      const [rows] = await db.execute(
        ` SELECT * FROM event INNER JOIN location ON location = location_id 
        INNER JOIN  user ON user.location_id = location.id WHERE user.id = ? `,
        [user.id]
      );
      return rows;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération des événements: " + err.message
      );
    }
  }
static async getRecentTop(limit) {
  try {
    const safeLimit = Number(limit) || 3; // sécurité : convertit en nombre
    const [rows] = await db.execute(
      `SELECT 
        id,
        title,
        category_id,
        event_image_id,
        date_start,
        address,
        price
      FROM event
      ORDER BY date_start DESC
      LIMIT ${safeLimit};`
    );
    return rows;
  } catch (err) {
    throw new Error(
      "Erreur lors de la récupération des événements récents : " + err.message
    );
  }
}


  //  selection par location de cat choisi
  static async getEventsByloc(locId) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM event WHERE location_id = ? ",
        [locId]
      );
      return rows;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération des événements par lieu: " + err.message
      );
    }
  }

  static async createEvent(eventData) {
    const {
      title,
      category_id,
      location_id,
      event_image_id,
      user_id, // 🔥 le créateur de l’événement
      date_start,
      date_end,
      hour_start,
      hour_end,
      price,
      address,
      description,
      event_rules,
      available_services,
      phone,
      email,
      website_url,
      social_name,
      organization_name,
      organization_description,
    } = eventData;

    try {
      const [result] = await db.execute(
        `INSERT INTO event (
          title, category_id, location_id, event_image_id, user_id,
          date_start, date_end, hour_start, hour_end, price, address,
          description, event_rules, available_services, phone, email,
          website_url, social_name, organization_name, organization_description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          category_id,
          location_id,
          event_image_id,
          user_id, // ⚡️ celui du token, passé via ton controller
          date_start,
          date_end,
          hour_start,
          hour_end,
          price,
          address,
          description,
          event_rules,
          available_services,
          phone,
          email,
          website_url,
          social_name,
          organization_name,
          organization_description,
        ]
      );

      return result;
    } catch (err) {
      console.error("Erreur dans createEvent:", err);
      throw new Error(
        "Erreur lors de la création de l'événement : " + err.message
      );
    }
  }

  static async updateEvent(id, updateData) {
    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    if (kays.lenght === 0) {
      throw new Error("Aucune donnéé fournie pour la mise à jour.");
    }

    const setClause = keys.map((key) => `${key} = ?`).join(",");

    const [result] = await db.execute(
      `UPDATE event SET ${setClause} WHERE id=?`,
      [...values, id]
    );
    return result.affectedRows > 0;
    // true si l'event à etais modifier
  }

  static async deleteEvent(id) {
    const [result] = await db.execute("DELETE FROM event WHERE id = ?", [id]);
    return result;
  }
}

module.exports = EventDAO;
