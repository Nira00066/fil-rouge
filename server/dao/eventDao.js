const db = require("../config/db.config");

class EventDAO {
  // Listes de tous les eventements

  static async getAllEvents() {
    const [rows] = await db.execute("SELECT * FROM event");
    return rows;
  }

  static async getEventById(id) {
    const [rows] = await db.execute("SELECT * FROM event WHERE id = ?", [id]);
    return rows[0];
  }

  // Uniquements par catégory
  static async getEventsByCategory(categoryId) {
    const [rows] = await db.execute(
      "SELECT * FROM event WHERE category_id = ?",
      [categoryId]
    );
    return rows;
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

    const [result] = await db.execute(
      `INSERT INTO event (
      title, category_id, location_id, date_start, date_end, hour_start, hour_end,
      price, address, description, event_rules, available_services,
      phone, email, website_url, social_name, organization_name, organization_description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category_id,
        location_id,
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
  }
}

module.exports = EventDAO;
