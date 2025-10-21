const daoevent = require("../dao/eventDao");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventDAO.getAllEvents();
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
    const category = req.params.category;
    const eventCarshow = await daoevent.getEventsByCategory(category);
    res.json(eventCarshow);
  } catch (err) {
    console.error("Erreur getEventsByCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
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




exports.createEvent = async (req, res) => {
  try {
    const newEvent = req.body;

    if (!newEvent.title || !newEvent.category_id || !newEvent.location_id) {
      return res.status(400).json({ message: "Données incomplètes" });
    }

    const result = await EventDAO.createEvent(newEvent);
    res
      .status(201)
      .json({ message: "Événement créé avec succès", id: result.insertId });
  } catch (err) {
    console.error("Erreur createEvent:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'événement" });
  }
};
