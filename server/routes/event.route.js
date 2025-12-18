const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const EventController = require("../controllers/event.controller");

router.use(express.json());

// Routes spécifiques d'abord
router.get("/evenements/recents", EventController.getRecent);
router.get("/evenements/category/:slug", EventController.getEventbyCategory);
router.get("/evenements/location/:locId/:userId", EventController.getEventsByUserLocation);
router.get("/evenements/user/:userId", authenticateToken, EventController.getEventsByUserLocation);

//  Routes génériques ensuite
router.get("/evenements", EventController.getAllEvents);
router.get("/evenements/:id", EventController.getEventById);

// Routes protégées (création / maj / suppression)
router.post("/evenements", EventController.createEvent);
router.put("/evenements/:id", authenticateToken, EventController.updateEvent);
router.delete("/evenements/:id", authenticateToken, EventController.deleteEvent);

module.exports = router;
