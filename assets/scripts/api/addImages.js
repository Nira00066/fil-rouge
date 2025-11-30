import { API_BASE_URL } from "./config.js";

async function uploadEventImage() {
    
    const fileInput = document.getElementById("event-image");
    
    // Vérifie si un fichier a été sélectionné
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        console.warn("Aucun fichier d'image sélectionné.");
        return null;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    // 💡 Récupérer le jeton d'authentification (JWT)
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        throw new Error("Authentification requise pour télécharger l'image.");
    }

    const res = await fetch(`${API_BASE_URL}/api/images/upload-image`, {
        method: "POST",
        // 🚀 Ajout de l'en-tête d'autorisation pour la sécurité
        headers: {
            "Authorization": `Bearer ${authToken}`
        },
        body: formData,
        // Note: fetch gère automatiquement Content-Type: multipart/form-data
        // lorsqu'un objet FormData est fourni, ne l'ajoutez pas manuellement.
    });

    const data = await res.json();
    
    // Vérifie si la requête a réussi (statut 200-299)
    if (!res.ok) {
        // Le back-end DOIT renvoyer un JSON avec 'message' en cas d'erreur
        const errorMessage = data.message || `Erreur de téléchargement: ${res.status}`;
        throw new Error(errorMessage);
    }
    
    // Le back-end DOIT renvoyer l'ID de l'image (data.imageId)
    return data.imageId;
}

// Rendre la fonction dispo globalement (méthode rapide)
window.uploadEventImage = uploadEventImage;