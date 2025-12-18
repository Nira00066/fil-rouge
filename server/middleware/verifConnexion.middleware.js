const UserDAO = require("../dao/user.dao"); // À ajouter si manquant
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

        //  Validation email et password
        if (!email || !password) {
            return throwError("Email et mot de passe requis.", 400);
        }

        //  Vérifie si l'utilisateur existe
        const user = await UserDAO.getUserByEmail(email); 
        if (!user) {
            // Statut 401: Identifiants incorrects
            return throwError("Identifiants incorrects.", 401); 
        }

        //  Vérifie le mot de passe avec bcrypt
        // Attention : le champ BDD doit s'appeler `hashed_password` ou équivalent.
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password); 
        if (!isPasswordValid) {
            // Statut 401: Identifiants incorrects
            return throwError("Identifiants incorrects.", 401); 
        }

        // Vérifie si la clé JWT est dispo
        if (!process.env.JWT_SECRET) {
            console.error("⚠️ JWT_SECRET manquant dans .env");
            return throwError("Erreur serveur : clé de sécurité manquante.", 500); 
        }

        //  Tout est bon → on stocke l'utilisateur dans req pour le contrôleur suivant
        req.user = user;
        next();
    } catch (err) {
        console.error("Erreur inattendue dans verifConnexion:", err);
        next(err); 
    }
}

module.exports = { verifConnexion };