const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");
const controllerUser = require("../controllers/Userlog.controller");
const controllerprofil = require("../controllers/userProfil.controller");
const validator = require("../service/servivesUser")
router.get("/Users", controllerUser.getAll);
router.get("/user/:id", controllerUser.getuserById);

router.post("/inscription",validator.verifinscription, controllerUser.postInscription);
router.post("/connexion",validator.verifConnexion, controllerUser.postConnexion);

// pour les tests toujours mettre ton token dans la header de ton postman ou autre
router.get("/profile/user/:id", authToken, controllerprofil.getProfilId);
router.patch("/profile/user/:id", authToken,controllerprofil.modifProfilId);
router.delete("/suppresion/user/:id",authToken,controllerprofil.suppresionProfil)
module.exports = router;
