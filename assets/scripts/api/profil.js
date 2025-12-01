import { API_BASE_URL } from "../../config.js"; 
import { showPopup } from "../../components/popup.js"; 
import { logoutUser } from "../userState.js"; 

const AUTH_TOKEN_KEY = 'authToken'; 
const USER_ID_KEY = 'userId'; 

document.addEventListener("DOMContentLoaded", fetchAndDisplayProfile);
// 💡 Attacher l'écouteur de déconnexion au bouton spécifique de la page profil
document.addEventListener("DOMContentLoaded", attachLogoutListener); 

// --- Fonctions Principales ---

/**
 * 💡 Récupère les données du profil via l'API sécurisée.
 */
async function fetchAndDisplayProfile() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);

    if (!token || !userId) {
        showPopup("Accès refusé. Veuillez vous connecter.", "error");
        setTimeout(() => { window.location.href = "../index.html"; }, 2000);
        return;
    }

    try {
        showPopup("Chargement du profil...", "loading", 10000);

        const response = await fetch(`${API_BASE_URL}/profile/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Envoi du token pour validation côté serveur
                "Authorization": `Bearer ${token}` 
            },
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message || `Erreur: ${response.status}. Accès profil refusé (token invalide ?).`;
            throw new Error(errorMessage);
        }

        displayProfileData(result.user); // Assurez-vous que votre API renvoie les données sous 'user'

        showPopup("Profil chargé avec succès !", "success", 1500);

    } catch (err) {
        console.error("Erreur de chargement du profil:", err.message);
        showPopup(err.message, "error"); 
    }
}

/**
 * 💡 Injecte les données récupérées dans les éléments HTML de profile.html.
 */
function displayProfileData(user) {
    if (!user) return;

    // Cible la section principale de texte du profil
    const profileDetails = document.querySelector(".profile_details");
    const profileAvatar = document.querySelector(".profile_avatar img");
    
    if (profileDetails) {
        // Mise à jour du nom complet
        profileDetails.querySelector('h2').textContent = `${user.firstname || user.name || 'Prénom Inconnu'} ${user.lastname || ''}`;
        
        // Mise à jour de l'email (si vous l'affichez, sinon retirez cette ligne)
        profileDetails.querySelector('p').textContent = user.email || 'Email non disponible';
        
        // On pourrait aussi ajouter l'ID quelque part pour le débogage:
        // const idContainer = document.createElement('small');
        // idContainer.textContent = `ID: ${user.id}`;
        // profileDetails.appendChild(idContainer);
    }
    
    // Mise à jour de la photo de profil
    if (profileAvatar) {
        // Le chemin doit être accessible depuis le front-end
        profileAvatar.src = user.profile_picture_url || '../images/default_user.webp'; 
    }
    
    // Mise à jour du compteur de favoris (si les données sont disponibles)
    const favorisCountSpan = document.querySelector(".favoris h3 span");
    if (favorisCountSpan) {
        // Remplacez 'user.favorites_count' par le champ réel renvoyé par votre API
        favorisCountSpan.textContent = `(${user.favorites_count || 0})`; 
    }
}

/**
 * 💡 Attache l'écouteur au bouton de déconnexion de la page profil.
 */
function attachLogoutListener() {
    const logoutBtn = document.querySelector(".profile_actions .logout_btn");
    
    if (logoutBtn) {
        // Assurez-vous que 'logoutUser' est importée ou définie localement
        logoutBtn.addEventListener('click', logoutUser); 
    }
}