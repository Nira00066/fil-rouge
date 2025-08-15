const express = require('express');
const mysql = require('mysql2');


const app = express();
const port = 3000;

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',      // Adresse du serveur SQL
  user: 'root',           // Ton utilisateur
  password: '0000',           // Ton mot de passe
  database: 'Novamett'     // Nom de ta base
});

// Vérifier la connexion
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL ✅');
});

// Exemple de route pour récupérer des données
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results);
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});