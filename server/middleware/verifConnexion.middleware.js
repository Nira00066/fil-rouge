const UserDAO = require("../dao/userDao"); // 💡 À ajouter si manquant
const bcrypt = require("bcrypt"); // 💡 À ajouter si manquant

async function verifConnexion(req, res, next) {
    // Fonction utilitaire pour lancer une erreur formatée
    const throwError = (message, statusCode = 400) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        return next(error);
    };

    try {
        const { email, password } = req.body;

        // 1️⃣ Validation basique
        if (!email || !password) {
            return throwError("Email et mot de passe requis.", 400);
        }

        // 2️⃣ Vérifie si l'utilisateur existe
        // Attention : UserDAO.getUserByEmail doit être async/await
        const user = await UserDAO.getUserByEmail(email); 
        if (!user) {
            // Statut 401: Identifiants incorrects
            return throwError("Identifiants incorrects.", 401); 
        }

        // 3️⃣ Vérifie le mot de passe avec bcrypt
        // Attention : le champ BDD doit s'appeler `hashed_password` ou équivalent.
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password); 
        if (!isPasswordValid) {
            // Statut 401: Identifiants incorrects
            return throwError("Identifiants incorrects.", 401); 
        }

        // 4️⃣ Vérifie si la clé JWT est dispo
        if (!process.env.JWT_SECRET) {
            console.error("⚠️ JWT_SECRET manquant dans .env");
            return throwError("Erreur serveur : clé de sécurité manquante.", 500); 
        }

        // ✅ Tout est bon → on stocke l'utilisateur dans req pour le contrôleur suivant
        req.user = user;
        next();
    } catch (err) {
        console.error("Erreur inattendue dans verifConnexion:", err);
        next(err); 
    }
}

// 🚀 LIGNE CRUCIALE À AJOUTER POUR EXPORTER LA FONCTION
module.exports = { verifConnexion };