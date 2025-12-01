import { checkUserState } from "../action/userState.js";

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const siteName = this.getAttribute("site-name") || "NovaMett";
        const tagline = this.getAttribute("tagline") || "Trouve tes events auto";

        // Détection du chemin
        const currentPath = window.location.pathname;
        let logoLink = "";
        let navLinksHTML = "";

        if (currentPath === "/" || currentPath.endsWith("/index.html")) {
            navLinksHTML = `
                <li><a href="/index.html">Accueil</a></li>
                <li><a href="pages/events.html">Événements</a></li>
                <li><a href="pages/eventAdd.html">Créer</a></li>
            `;
            logoLink = `./index.html`;
        } else {
            navLinksHTML = `
                <li><a href="../index.html">Accueil</a></li>
                <li><a href="./events.html">Événements</a></li>
                <li><a href="./eventAdd.html">Créer</a></li>
            `;
            logoLink = `../index.html`;
        }

        // ⭐⭐⭐ MODIF 1 : Chemin dynamique pour images (rootPath)
        // Permet d'éviter les images en 404 selon la page où on est
        const rootPath =
            currentPath === "/" || currentPath.endsWith("../index.html")
                ? "./"
                : "../";
        // ⭐⭐⭐ FIN MODIF

        // Injection complète
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

                            <div class="btn_co" id="user-action-container">
                                <button class="connexion_btn" id="open-login-popup">
                                    
                                  
                                    <img src="${rootPath}images/icones/user.png" alt="user" />
                                

                                    Connexion
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        `;

        // --- lancer checkUserState APRÈS insertion du header ---
        setTimeout(() => checkUserState(), 0);
    }
}

if (!customElements.get("app-header")) {
    customElements.define("app-header", HeaderComponent);
}
