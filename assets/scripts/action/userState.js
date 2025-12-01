const AUTH_TOKEN_KEY = 'authToken'; 
const USER_ID_KEY = 'userId'; 

// Vérifie si l'utilisateur est connecté et met à jour l'affichage
function checkUserState() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);

    const btnCoContainer = document.getElementById("user-action-container");

    if (!btnCoContainer) {
        console.error("Conteneur user-action-container introuvable.");
        return;
    }

    if (token && userId) {
        // ----- UTILISATEUR CONNECTÉ -----
        const htmlConnected = `
            <button class="btn_profil" id="profile-link-btn">
                <img src="images/icones/user.png" alt="Profil"/>
                Profil
            </button>
            <button class="btn_deconnexion" id="logout-btn">
                Déconnexion
            </button>
        `;

        btnCoContainer.innerHTML = htmlConnected;

        // Bouton déconnexion
        document.getElementById("logout-btn")?.addEventListener("click", logoutUser);

        // Bouton profil
        const profileBtn = document.getElementById("profile-link-btn");
        if (profileBtn) {
            const pathPrefix = window.location.pathname.includes('/pages/') ? './' : 'pages/';
            profileBtn.addEventListener('click', () => {
                window.location.href = `${pathPrefix}profil.html?id=${userId}`;
            });
        }

    } else {
        // ----- UTILISATEUR NON CONNECTÉ -----
        btnCoContainer.innerHTML = `
            <button class="connexion_btn" id="open-login-popup">
                <img src="images/icones/user.png" alt="user"/>
                Connexion
            </button>
        `;
    }
}

function logoutUser() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);

    showPopup("Vous êtes déconnecté. À plus 👋", "info");
    setTimeout(() => window.location.reload(), 1500);
}

export { checkUserState, logoutUser };
