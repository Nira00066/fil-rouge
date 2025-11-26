const EventDAO = require("../dao/eventDao");
const daoevent = require("../dao/eventDao");

// Get all events
/*
http://localhost:3000/evenements

retour de tous les events
*/

exports.getAllEvents = async (req, res) => {
  console.log('tu es ici ')
try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      date: req.query.date,
      city: req.query.city,
    };

    const events = await EventDAO.getAllEvents(filters);
    res.status(200).json(events);
  } catch (err) {
    console.error("Erreur getAllEvents:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des événements" });
  }
};

// GET /event/:id

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventDAO.getEventById(id);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error("Erreur getEventById:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Get event by id category

exports.getEventbyCategory = async (req, res) => {
  try {
    const slug = req.params.slug; // ✅ ex: "competition"

    // On laisse le DAO s'occuper du SQL
    const events = await EventDAO.getEventsByCategorySlug(slug);

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun événement trouvé pour cette catégorie" });
    }

    res.status(200).json(events);
  } catch (err) {
    console.error("Erreur getEventsByCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getRecent = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3; // <--- on récupère ?limit=3 depuis l'URL
    const events = await EventDAO.getRecentTop(limit);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getEventsByUserLocation = async (req, res) => {
  try {
    const user = { id: req.params.userId };
    const events = await EventDAO.getEventsBylocUser(user);
    res.status(200).json(events);
  } catch (err) {
    console.error("Erreur getEventsByUserLocation:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const success = await EventDAO.updateEvent(id, updatedData);

    if (!success) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.status(200).json({ message: "Événement mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur : " + error.message });
  }
};
exports.createEvent = async (req, res) => {
  try {
    console.log("📥 Données reçues :", req.body);
    console.log("👤 Utilisateur :", req.user);

    const user_id = req.user ? req.user.id : null;
    if (!user_id) console.warn("⚠️ Aucun user_id trouvé, test avec 1");

    const data = req.body;

    const eventData = {
      ...data,
      event_image_id: data.event_image_id ?? null,
      user_id: user_id || 1,
      event_rules: JSON.stringify(data.event_rules || []),
      available_services: JSON.stringify(data.available_services || []),
      tags: JSON.stringify(data.tags || []),
    };


    console.log("🧩 Données préparées pour la DB :", eventData);

    const result = await EventDAO.createEvent(eventData);

    res.status(201).json({
      message: "✅ Événement créé avec succès",
      eventId: result.insertId,
    });
  } catch (err) {
    console.error("💥 ERREUR DANS createEvent :", err);
    if (err.stack) console.error("📜 Stack :", err.stack);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création", error: err.message });
  }
};



exports.deleteEvent = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const result = await EventDAO.deleteEvent(id);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Aucun événement trouvé avec cet ID" });
    }

    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (err) {
    console.error("Erreur deleteEvent:", err);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression de l'événement" });
  }
};
