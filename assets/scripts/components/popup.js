import { handleConnexionForm } from "../api/userConnexion.js"; // Assurez-vous que le chemin est correct
import { handleInscriptionForm } from "../api/usersInscription.js"; // Assurez-vous que le chemin est correct

// =========================
// 🔵 TEMPLATES
// =========================

export const loginTemplate = `
  <section class="connexion">
    <div class="login-container">
      <div class="login-image">
        <img src="./images/user/connexion-bg.jpg" alt="Voiture vintage" />
      </div>
      <div class="login-form">
        <button class="close-btn" aria-label="Fermer">×</button>
        <h2>Connexion</h2>
        <p>Connecte-toi pour participer aux événements</p>
        <form id="form-connexion">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" required />
          <label for="login-password">Mot de passe</label>
          <input type="password" id="login-password" required />
          <button type="submit" class="btn-submit">Connexion</button>
        </form>
        <p class="register-text">
          Pas encore de compte ?
          <a href="#" id="open-register">S’inscrire</a>
        </p>
      </div>
    </div>
  </section>
`;

export const registerTemplate = `
<section class="inscription">
  <div class="inscription-container">
    <div class="inscription-image">
      <img src="./images/user/inscription-bg.jpg" alt="Voiture rétro" />
    </div>
    <div class="inscription-form">
      <button class="close-btn" aria-label="Fermer">×</button>
      <h2>Inscription</h2>
      <p>Rejoins la communauté auto</p>
      <form id="form-inscription">
        <div class="form-row">
          <div class="form-col">
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom" required />
          </div>
          <div class="form-col">
            <label for="nom">Nom</label>
            <input type="text" id="nom" required />
          </div>
        </div>
        <label for="register-email">Email</label>
        <input type="email" id="register-email" required />
        <label for="register-password">Mot de passe</label>
        <input type="password" id="register-password" required />
        <label for="checkPassword">Confirmer</label>
        <input type="password" id="checkPassword" required />
        <button type="submit" class="btn-submit">Créer mon compte</button>
      </form>
      <p class="register-text">
        Déjà un compte ?
        <a href="#" id="open-login">Se connecter</a>
      </p>
    </div>
  </div>
</section>
`;

// =========================
// 🔵 POPUP LOGIC
// =========================

const overlay = document.getElementById("popup-overlay");
const popupContent = document.getElementById("popup-content");

// 🚨 Élément pour les messages flash
const popupMessageContainer = document.getElementById("popup-message-container") || document.body;

// 1. Ouvrir la Popup
export function openPopup(template, options = {}) {
    popupContent.innerHTML = template;
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    const closeBtn = popupContent.querySelector(".close-btn");
    if (closeBtn) {
        if (options.topUp) closeBtn.classList.add("top-up");
        else closeBtn.classList.remove("top-up");

        closeBtn.addEventListener("click", closePopup);
    }
    
    // Attachement des listeners dynamiques après injection du HTML
    if (template === loginTemplate) {
        handleConnexionForm(); 
    }
    
    if (template === registerTemplate) {
        handleInscriptionForm();
    }
}

// 2. Fermer la Popup
export function closePopup() {
    overlay.classList.add("hidden");
    popupContent.innerHTML = "";
    document.body.style.overflow = "auto";
}

// 3. Afficher les messages flash (success, error, loading)
export function showPopup(message, type = "info", duration = 3000) {
    // Crée une div pour le message
    const msgEl = document.createElement("div");
    msgEl.classList.add("flash-message", type);
    msgEl.textContent = message;
    
    // Injecte et affiche
    popupMessageContainer.appendChild(msgEl);
    
    // Fait disparaître après la durée spécifiée
    setTimeout(() => {
        msgEl.remove();
    }, duration);
}

// 4. Fermer si clic en dehors
if (overlay) {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePopup();
    });
}

// 5. Délégation d'événement pour le basculement Connexion <-> Inscription
if (popupContent) {
    popupContent.addEventListener("click", (e) => {
        const id = e.target.id;

        if (id === "open-login") {
            e.preventDefault();
            openPopup(loginTemplate, { topUp: true });
        }

        if (id === "open-register") {
            e.preventDefault();
            openPopup(registerTemplate, { topUp: false });
        }
    });
}