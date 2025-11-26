// Chemin : ../assets/scripts/userState.js
import { showPopup } from "../components/popup.js"; // ✅ Ajout de .js

const AUTH_TOKEN_KEY = 'authToken'; 
const USER_ID_KEY = 'userId'; 

// 1. Initialise l'état au chargement de la page
document.addEventListener("DOMContentLoaded", checkUserState);

/**
 * 💡 Vérifie si l'utilisateur est connecté et met à jour l'UI.
 */
function checkUserState() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);
    
    // Éléments du DOM à modifier
    const btnCoContainer = document.querySelector(".btn_co");
    const connexionBtn = document.getElementById("open-login-popup");
    
    if (token && userId) {
        // --- CAS : UTILISATEUR CONNECTÉ ---
        console.log("✅ Utilisateur connecté, userId:", userId); // Debug
        
        // 1. Masquer le bouton de Connexion standard
        if (connexionBtn) {
            connexionBtn.style.display = 'none';
        }
        
        // 2. Créer les boutons Profil et Déconnexion
        const htmlConnected = `
            <button class="btn_profil" onclick="window.location.href='./pages/profile.html?id=${userId}'">
                <span class="material-symbols-outlined">account_circle</span>
                Profil
            </button>
            <button class="btn_deconnexion" id="logout-btn">
                Déconnexion
            </button>
        `;
        
        if (btnCoContainer) {
            btnCoContainer.innerHTML = htmlConnected;
            
            // 3. Attacher l'écouteur de déconnexion
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logoutUser);
            }
        }
        
    } else {
        // --- CAS : UTILISATEUR DÉCONNECTÉ ---
        console.log("❌ Utilisateur déconnecté"); // Debug
        
        // S'assurer que le bouton de connexion est visible
        if (connexionBtn) {
            connexionBtn.style.display = 'flex'; // ou 'block' selon votre CSS initial
        }
        
        // Nettoyer si d'anciens boutons de connexion étaient là
        if (btnCoContainer) {
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                btnCoContainer.innerHTML = ''; // Nettoyer l'intérieur
                if (connexionBtn && !btnCoContainer.contains(connexionBtn)) {
                    btnCoContainer.appendChild(connexionBtn); // Rajouter le bouton de connexion original
                }
            }
        }
    }
}

/**
 * Gère la déconnexion (supprime les tokens).
 */
function logoutUser() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    
    console.log("🔒 Tokens supprimés du localStorage"); // Debug
    
    // Recharger la page ou mettre à jour l'UI
    showPopup("Vous êtes déconnecté. Au revoir 👋", "info");
    setTimeout(() => {
        window.location.reload(); 
    }, 1500);
}

// Exportez la fonction pour qu'elle puisse être utilisée si nécessaire
export { checkUserState, logoutUser };