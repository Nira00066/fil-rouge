const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format "Bearer token"

  if (!token) return res.status(401).json({ message: 'Non connecté' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user; // stocke l'utilisateur pour la suite
    next();
  });
};



module.exports = authenticateToken
