const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth.middleware");
const controllerUser = require("../controllers/userLogin.controller");
const controllerprofil = require("../controllers/userProfil.controller");
const { verifConnexion } = require("../middleware/verifConnexion.middleware");
const { verifInscription } = require("../middleware/verifInsciption.middleware")

router.get("/users", controllerUser.getAll);
router.get("/user/:id", controllerUser.getuserById);

router.post(
  "/inscription",
  verifInscription,
  controllerUser.postInscription
);

router.post("/connexion", verifConnexion, controllerUser.postConnexion);

// pour les tests toujours mettre ton token dans la header de ton postman ou autre
router.get("/profile/user/:id", authToken, controllerprofil.getProfilId);
router.patch("/profile/user/:id", authToken, controllerprofil.modifProfilId);
router.delete(
  "/suppresion/user/:id",
  authToken,
  controllerprofil.suppresionProfil
);
module.exports = router;
