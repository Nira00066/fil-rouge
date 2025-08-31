// Je veux que si l'utilisateur n'est pas authentifier alors il n'as pas acces a certaine route
//  tel que l'acces au profil ou la modification du profil
require("dotenv").config();

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format "Bearer token"

  if (!token) return res.status(401).json({ message: 'Non connecté' });

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user; // stocke l'utilisateur pour la suite
    next();
  });
};



module.exports = authenticateToken
