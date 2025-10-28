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

router.get("/evenements/category/:slug", EventController.getEventbyCategory);

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


// http://localhost:3000/evenements/?limit=3
router.get(
  "/evenements",
  EventController.getRecent
);


//  faire une autre route que si connecter alors mettre les 3 premieres 
module.exports = router;
