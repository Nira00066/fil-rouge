// Chemin suggéré : ../assets/scripts/pages/errorPage.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer le code de statut de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    // 2. Sélectionner les éléments à mettre à jour
    const h1Element = document.querySelector('.error_content h1');
    const h2Element = document.querySelector('.error_content h2');
    const pElement = document.querySelector('.error_content p');
    
    // Si vous voulez utiliser <h3> pour le message principal au lieu de <h2>
    // const h3Element = document.querySelector('.error_content h3'); 
    
    // Variables pour le contenu dynamique
    let title = "ERREUR";
    let message = "Une erreur est survenue.";
    let description = "Nous n'avons pas pu déterminer la nature exacte de l'erreur. Veuillez retourner à l'accueil.";

    if (status) {
        title = status; // Affiche le code (404, 500, etc.)
        
        switch (status) {
            case '400':
                message = "Requête invalide.";
                description = "Le serveur n'a pas pu comprendre votre demande. Les données envoyées sont peut-être incorrectes.";
                break;
            case '403':
                message = "Accès non autorisé (Permission refusée).";
                description = "Vous n'avez pas les droits nécessaires pour accéder à cette ressource. Veuillez vous connecter ou vérifier vos privilèges.";
                break;
            case '404':
                message = "Oups! La page que vous recherchez est introuvable.";
                description = "Il semble que la page que vous essayez d'atteindre n'existe pas ou a été déplacée.";
                break;
            case '409':
                message = "Conflit de ressource.";
                description = "La ressource que vous essayez de créer (ex: email) existe déjà dans notre base de données.";
                break;
            case '500':
                message = "Erreur interne du serveur.";
                description = "Une erreur critique est survenue sur nos serveurs. Veuillez réessayer plus tard ou contacter le support technique.";
                break;
            default:
                message = `Erreur HTTP ${status} non gérée.`;
                description = "Une erreur inattendue est survenue côté serveur. Veuillez réessayer.";
        }
    }
    
    // 3. Mise à jour du contenu HTML
    if (h1Element) h1Element.textContent = title;
    if (h2Element) h2Element.textContent = message;
    if (pElement) pElement.textContent = description;

});