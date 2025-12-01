function verifInscription(req, res, next) {
    const user = req.body;
console.log(user);
    // Fonction utilitaire pour lancer une erreur formatée
    const throwError = (message, statusCode = 400) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        return next(error);
    };
console.log(user.email);
console.log(user.firstname);
console.log(user.lastname);
console.log(user.password);

    // Vérifie si les champs obligatoires sont présents
    if (
        user.email.trim().length < 3 ||
        user.password.trim().length < 3 ||
        user.firstname.trim().length < 3 ||
        user.lastname.trim().length < 3
    ) {
        return throwError("Champs manquants. Veuillez remplir tous les champs.", 400);
    }

    if (typeof user.firstname !== "string" || typeof user.lastname !== "string") {
        return throwError("Nom et prénom doivent être des chaînes de caractères.", 400);
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(user.email)) {
        return throwError("Adresse e-mail invalide.", 400);
    }


    // Optionnel : check de longueur ou sécurité du mot de passe
    if (user.password.length < 8) {
        return throwError("Le mot de passe doit contenir au moins 8 caractères.", 400);
    }

    // Si tout est bon :
    next();
}

// 🚀 LIGNE CRUCIALE À AJOUTER POUR EXPORTER LA FONCTION
module.exports = { verifInscription };