import { checkUserState } from "../action/userState.js";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const siteName = this.getAttribute("site-name") || "NovaMett";
    const tagline = this.getAttribute("tagline") || "Trouve tes events auto";

    const currentPath = window.location.pathname;
    let logoLink = "";
    let navLinksHTML = "";

    if (currentPath === "/" || currentPath.endsWith("/index.html")) {
      navLinksHTML = `
        <li><a href="/index.html">Accueil</a></li>
        <li><a href="pages/listEvents.html">Événements</a></li>
        <li><a href="pages/eventAdd.html">Créer</a></li>
      `;
      logoLink = `./index.html`;
    } else {
      navLinksHTML = `
        <li><a href="../index.html">Accueil</a></li>
        <li><a href="./listEvents.html">Événements</a></li>
        <li><a href="./eventAdd.html">Créer</a></li>
      `;
      logoLink = `../index.html`;
    }

    const rootPath =
      currentPath === "/" || currentPath.endsWith("../index.html")
        ? "./"
        : "../";

    this.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="header_top">

            <div class="header_logo">
              <a href="${logoLink}">${siteName}</a>
              <p>${tagline}</p>
            </div>

            <div class="header_burger" id="burger-btn">
              <img src="${rootPath}images/icones/icones_burger.png" alt="menu" />
            </div>

            <div class="header_nav" id="mobile-nav">

              <div class="header_nav_close" id="close-nav">
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6l-12 12"
                        stroke="#000"
                        stroke-width="2"
                        stroke-linecap="round"/>
                </svg>
              </div>

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

    const burger = this.querySelector("#burger-btn");
    const nav = this.querySelector("#mobile-nav");
    const closeNav = this.querySelector("#close-nav");

    if (burger && nav && closeNav) {
      burger.addEventListener("click", () => {
        nav.classList.add("open");
      });

      closeNav.addEventListener("click", () => {
        nav.classList.remove("open");
      });

      document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
          nav.classList.remove("open");
        }
      });
    } else {
      console.error(" Problème : un élément du menu burger est introuvable.");
    }

    // -------------------------
    //   ⭐ MEDIA QUERY SYSTEM
    // -------------------------

    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const closeBtn = this.querySelector("#close-nav");

    const updateMenuVisibility = () => {
      if (mediaQuery.matches) {
        // Desktop
        burger.style.display = "none";
        closeBtn.style.display = "none";
        nav.classList.remove("open");
      } else {
        // Mobile
        burger.style.display = "block";
        closeBtn.style.display = "block";
      }
    };

    updateMenuVisibility();
    mediaQuery.addEventListener("change", updateMenuVisibility);

    // Mettre à jour l'état utilisateur après insertion du header
    setTimeout(() => checkUserState(), 0);
  }
}

if (!customElements.get("app-header")) {
  customElements.define("app-header", HeaderComponent);
}
