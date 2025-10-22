const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");
const controllerUser = require("../controllers/Userlog.controller");
const profil = require("../controllers/userProfil.controller");

router.get("/Users", controllerUser.getAll);
router.get("/user/:id",  controllerUser.getuserById)

router.post("/inscription", controllerUser.postInscription);

router.post("/connexion", controllerUser.postConnexion);

// pour les tests toujours mettre ton token dans la header de ton postman ou autre
router.get("/profile/user/:id", authToken, profil.getProfilId);
router.patch("/profile/user/:id", authToken,profil.modifProfilId);
router.delete("/suppresion/user/:id",authToken,profil.suppresionProfil)
module.exports = router;
