// HeaderComponent.js

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    // Utilisation du Light DOM pour les styles globaux
  }

  connectedCallback() {
    // --- 1. Récupération des Attributs ---
    const siteName = this.getAttribute("site-name") || "NovaMett";
    const tagline = this.getAttribute("tagline") || "Trouve tes events auto";

    // --- 2. VÉRIFICATION DE L'ÉTAT (TOKEN) ---
    const token = localStorage.getItem("token");
    let userActionContent = "";
    let btnId = "";

    if (token) {
      // Utilisateur connecté : Afficher Profil
      userActionContent = `
            <img src="/assets/img/user.png" alt="Profil" />
            Profil
            `;
      btnId = "profile-link-btn";
    } else {
      // Utilisateur non connecté : Afficher Connexion
      userActionContent = `
            <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAj0lEQVR4nNXQQQ7BUBSF4W/UGelc7YgQa5J29oMZXUYtQC0ACzC5Ztr0xYQ/uZP7cv578vhVMuxwQ4c6dqOpsccMBQ6oUgRdBN/MY/eV4JoiqKJ2EeEjyhRBFpIuLpepn7hEg2fMGYux4RItVpjErHHBdszlFvmHtzwkg02auNzHBqchwSMq9zHFfUjwh7wAHuEdJZUq+i0AAAAASUVORK5CYII=" 
            alt="user"
            />
            Connexion
            `;
      btnId = "open-login-popup";
    }

    // --- 3. LOGIQUE CLÉ : DÉTERMINER LA NAVIGATION ---
    const currentPath = window.location.pathname;
    let logoLink = "";
    let navLinksHTML = "";

    // Si la page est à la racine (index.html), les liens doivent pointer VRAIMENT vers /pages/...
    if (currentPath === "/" || currentPath.endsWith("/index.html")) {
      // Chemins relatifs depuis la RACINE du site (ex: index.html)
      navLinksHTML = `
                <li><a href="/index.html">Accueil</a></li>
                <li><a href="pages/events.html">Événements</a></li>
                <li><a href="pages/eventAdd.html">Créer</a></li>
            `;
      logoLink = `./index.html`;
    } else {
      // Chemins relatifs depuis un sous-dossier (ex: /pages/profil.html)
      navLinksHTML = `
                <li><a href="../index.html">Accueil</a></li>
                <li><a href="./events.html">Événements</a></li>
                <li><a href="./eventAdd.html">Créer</a></li>
            `;
      logoLink = `../index.html`;
    }

    // --- 4. INJECTION DU HTML ---
    this.innerHTML = `
            <header class="header">
                <div class="container">
                    <div class="header_top">
                        
                        <div class="header_logo">
                            <a href="${logoLink}">${siteName}</a>
                            <p>${tagline}</p>
                        </div>

                        <div class="header_nav">
                            <nav>
                                <ul class="header_liens">
                                    ${navLinksHTML} 
                                </ul>
                            </nav>

                            <div class="btn_co">
                                <button class="connexion_btn" id="${btnId}">
                                    ${userActionContent} 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;

    // --- 5. ATTACHER L'ÉVÉNEMENT ---
    this.attachEvents(token);
  }

  /**
   * Attache l'écouteur de clic pour la redirection Profil si l'utilisateur est connecté.
   * @param {string | null} token - Le token d'authentification ou null.
   */
  attachEvents(token) {
    // querySelector cherche le bouton à l'intérieur du composant (this)
    const connexionBtn = this.querySelector(".connexion_btn");

    if (!connexionBtn) return;

    if (token) {
      // Si le token existe, on gère la redirection du bouton 'Profil'.
      connexionBtn.addEventListener("click", () => {
        window.location.href = "/pages/profil.html";
      });
    }
    // L'action pour le bouton 'Connexion' est gérée par la délégation d'événements globale (open-login-popup).
  }
}
if (!customElements.get("app-header")) {
  customElements.define("app-header", HeaderComponent);
}
customElements.define("app-header", HeaderComponent);
