const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const EventController = require("../controllers/EventController");

router.use(express.json());

// Action public 
router.get("/evenements", EventController.getAllEvents);
router.get("/evenements/:id", EventController.getEventById);

// Action pour que mon route sois plus attractif  
router.get("/evenements/carshow", (req, res) =>
  EventController.getEventsByCategory({ params: { categoryId: 1 } }, res)
);

router.get("/evenements/drift", (req, res) =>
  EventController.getEventsByCategory({ params: { categoryId: 3 } }, res)
);

router.get("/evenements/rally", (req, res) =>
  EventController.getEventsByCategory({ params: { categoryId: 2 } }, res)
);

router.get("/evenements/festival", (req, res) =>
  EventController.getEventsByCategory({ params: { categoryId: 5 } }, res)
);

router.get("/evenements/location/:locId", EventController.getEventsByLocation);





//  Action Admin / USER
router.get(
  "/evenements/user/:userId",
  authenticateToken,
  EventController.getEventsByUserLocation
);

router.post("/evenements", authenticateToken, EventController.createEvent);
router.put("/evenements/:id", authenticateToken, EventController.updateEvent);
router.delete(
  "/evenements/:id",
  authenticateToken,
  EventController.deleteEvent
);

module.exports = router;
