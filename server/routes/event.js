const express = require("express");
const router = express.Router();
const app = express();
const authenticateToken = require('../middleware/auth');
app.use(express.json());


router.get("/evenements", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM event");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
});

// Chemain par category 

router.get("/evenements/carShow", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM event WHERE category_id = 1");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
});
router.get("/evenements/Drift", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM event WHERE category_id = 3");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }

});

router.get("/evenements/Rally", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM event WHERE category_id = 2");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
});

router.get("/evenements/festival", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM event WHERE category_id = 5");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur: " + err.message);
  }
});

// Chemain par category 


router.post("/Cree/evenement",authenticateToken ,async( req, res ) => {

})




