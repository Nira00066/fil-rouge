/**
 * Middleware de gestion centralisée des erreurs.
 * * 💡 Il doit avoir obligatoirement QUATRE arguments : (err, req, res, next).
 * Le premier argument (err) est l'objet d'erreur passé par next(err).
 */
const errorHandler = (err, req, res, next) => {
    // 1. Détermine le Statut HTTP
    // Si l'erreur a un statut défini (ex: 400, 404, 403), on l'utilise.
    // Sinon, on assume une erreur interne du serveur (500).
    const statusCode = err.statusCode || 500;

    // 2. Détermine le Message
    const message = err.message || 'Une erreur interne du serveur est survenue.';

    // 3. Log l'erreur (pour vous, le développeur)
    // On logue principalement les erreurs critiques ou inconnues (>= 500)
    if (statusCode >= 500) {
        console.error(`[ERREUR CRITIQUE ${statusCode}] ${message}`, err.stack);
    } else if (statusCode < 500) {
        // Log les erreurs client (4xx) qui pourraient indiquer une mauvaise requête
        console.warn(`[ERREUR CLIENT ${statusCode}] ${message}`);
    }

    // 4. Envoie la Réponse JSON au client
    res.status(statusCode).json({
        success: false, // Indicateur clair d'échec
        status: statusCode,
        message: message,
        // On pourrait ajouter d'autres détails ici en mode 'development', mais pas en production.
        // details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
};

module.exports = errorHandler;