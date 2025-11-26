

import { API_BASE_URL } from "./config.js";
import { showPopup, closePopup } from "../components/popup.js"; // Assurez-vous que le chemin vers popup.js est correct

const AUTH_TOKEN_KEY = 'authToken'; 
const USER_ID_KEY = 'userId'; 

/**
 * 💡 Votre logique de soumission originale, mais dans une fonction réutilisable.
 * @param {Event} e 
 */
async function submitConnexion(e) {
    e.preventDefault();
    
    // Récupère les données du formulaire directement à partir du DOM (important pour les popups)
    const data = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    };
    
    showPopup("Connexion en cours...", "loading", 5000); 

    try {
        const response = await fetch(`${API_BASE_URL}/api/connexion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json(); 

        if (!response.ok) {
            const errorMessage = result.message || `Erreur HTTP: ${response.status}. Vérifiez vos identifiants.`;
            throw new Error(errorMessage);
        }

        // --- GESTION DU SUCCÈS ET DU TOKEN ---
        
        if (result.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, result.token);
            
            // Stockage de l'ID utilisateur
            const userId = result.userId || (result.user ? result.user.id : null);
            if (userId) {
                localStorage.setItem(USER_ID_KEY, userId);
            }
            
            showPopup("Connexion réussie ! Redirection...", "success");

            // Redirection après 2 secondes vers la page d'accueil
            setTimeout(() => {
                closePopup(); 
                window.location.href = "../index.html";
            }, 2000);
        } else {
            throw new Error("Connexion réussie, mais aucun token n'a été reçu du serveur.");
        }

    } catch (err) {
        console.error("Erreur de connexion détaillée:", err.message);
        showPopup(err.message, "error"); 
    }
}

/**
 * Fonction exportée pour attacher l'écouteur APRÈS l'injection du formulaire dans la modale.
 */
export function handleConnexionForm() {
    // 💡 Ici, nous cherchons le formulaire au moment où nous savons qu'il est dans le DOM.
    const formConnexion = document.getElementById("form-connexion");

    if (!formConnexion) return;
    
    // Supprime l'écouteur si déjà présent (utile en cas de bascule Inscription -> Connexion)
    formConnexion.removeEventListener("submit", submitConnexion);
    formConnexion.addEventListener("submit", submitConnexion);
}