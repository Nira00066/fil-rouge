const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const EventController = require("../controllers/eventGet.controller");

router.use(express.json());

// Action public
router.get("/evenements", EventController.getAllEvents);
router.get("/evenements/:id", EventController.getEventById);

// Action pour que mon route sois plus attractif
/* 

http://localhost:3000/evenements/category/ plus le nom de la category 

valider pour tous 

*/ 


router.get("/evenements/category/carshow", (req, res) =>
  EventController.getEventbyCategory({ params: { categoryId: 1 } }, res)
);

router.get("/evenements/category/rally", (req, res) =>
  EventController.getEventbyCategory({ params: { categoryId: 2 } }, res)
);
router.get("/evenements/category/drift", (req, res) =>
  EventController.getEventbyCategory({ params: { categoryId: 3 } }, res)
);

router.get("/evenements/category/festival", (req, res) =>
  EventController.getEventbyCategory({ params: { categoryId: 5 } }, res)
);

router.get(
  "/evenements/location/:locId/:userId",
  EventController.getEventsByUserLocation
);

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
