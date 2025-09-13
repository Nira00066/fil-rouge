const express = require("express");
const router = express.Router();
const db = require("../config/db.config");
const authToken = require("../middleware/auth");
const controllerUser = require("../controllers/Userlog.controller");
const profil = require("../controllers/userProfil.controller");

router.get("/", controllerUser.getAll);

router.post("/inscription", controllerUser.postInscription);

router.post("/connexion", controllerUser.postConnexion);

router.get("/profile/user/:id", authToken, profil.getProfilId);
router.patch("/profile/user/:id", authToken,profil.modifProfilId);
router.delete("/suppresion",profil.suppresionProfil)
module.exports = router;
