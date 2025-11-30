const EventDAO = require("../dao/eventDao");
const daoevent = require("../dao/eventDao");

// Get all events
/*
http://localhost:3000/evenements

retour de tous les events
*/

const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Get all events
exports.getAllEvents = async (req, res, next) => {
  // 💡 Ajout de 'next'
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
    next(err); // 🚨 Passer l'erreur au middleware d'erreur
  }
};
// GET /event/:id

exports.getEventById = async (req, res, next) => {
  
  try {
    const { id } = req.params;
    const event = await EventDAO.getEventById(id);

    if (!event) {
      return next(createError("Événement non trouvé", 404));
    }
    res.status(200).json(event);
  } catch (err) {
    console.error("Erreur getEventById:", err);
    next(err); // Passer l'erreur au middleware d'erreur
  }
};

// Get event by category slug
exports.getEventbyCategory = async (req, res, next) => {
  
  try {
    const slug = req.params.slug;
    const events = await EventDAO.getEventsByCategorySlug(slug);

    if (!events || events.length === 0) {
      return next(
        createError("Aucun événement trouvé pour cette catégorie", 404)
      );
    }

    res.status(200).json(events);
  } catch (err) {
    console.error("Erreur getEventsByCategory:", err);
    next(err); // Passer l'erreur au middleware d'erreur
  }
};

// Get recent events
exports.getRecent = async (req, res, next) => {
 
  try {
    const limit = parseInt(req.query.limit) || 3;
    const events = await EventDAO.getRecentTop(limit);
    res.status(200).json(events);
  } catch (err) {
    // Remplacé par next(error)
    next(err);
  }
};

// Get events by user location (Attention: userId est dans req.params)
exports.getEventsByUserLocation = async (req, res, next) => {
  // Ajout de 'next'
  try {
    const user = { id: req.params.userId };
    const events = await EventDAO.getEventsBylocUser(user);
    res.status(200).json(events);

  } catch (err) {

    console.error("Erreur getEventsByUserLocation:", err);
    next(err); //  Passer l'erreur au middleware d'erreur

  }
};

// Update event
exports.updateEvent = async (req, res, next) => {

  try {
    const id = req.params.id;
    const updatedData = req.body;

    const success = await EventDAO.updateEvent(id, updatedData);

    if (!success) {
      return next(createError("Événement non trouvé pour la mise à jour", 404));
    }

    res.status(200).json({ message: "Événement mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur updateEvent:", error);
    next(error); // Passer l'erreur au middleware d'erreur
  }
};

// Create event
exports.createEvent = async (req, res, next) => {

  try {
    console.log(" Données reçues :", req.body);
    console.log(" Utilisateur :", req.user);

    const user_id = req.user ? req.user.id : null;
    if (!user_id) console.warn(" Aucun user_id trouvé, test avec 1");

    const data = req.body;

    const eventData = {
      ...data,
      event_image_id: data.event_image_id ?? null,
      user_id: user_id || 1, // Assurez-vous que l'ID utilisateur est géré par un middleware d'auth
      event_rules: JSON.stringify(data.event_rules || []),
      available_services: JSON.stringify(data.available_services || []),
      tags: JSON.stringify(data.tags || []),
    };

    console.log(" Données préparées pour la DB :", eventData);

    const result = await EventDAO.createEvent(eventData);

    res.status(201).json({
      message: " Événement créé avec succès",
      eventId: result.insertId,
    });
  } catch (err) {
    console.error("ERREUR DANS createEvent :", err);
    next(err); //  Passer l'erreur au middleware d'erreur
  }
};

// Delete event
exports.deleteEvent = async (req, res, next) => {

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return next(createError("ID d'événement invalide", 400));
  }

  try {
    const result = await EventDAO.deleteEvent(id);
    if (result.affectedRows === 0) {
     
      return next(
        createError("Aucun événement trouvé avec cet ID à supprimer", 404)
      );
    }

    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (err) {
    console.error("Erreur deleteEvent:", err);
    next(err); //  Passer l'erreur au middleware d'erreur
  }
};
