import { loginTemplate } from "../components/modaLogin.js";
import { registerTemplate } from "../components/modalInscription.js";



console.log("🔥 popup.js chargé !");

// ELEMENTS
const overlay = document.getElementById("popup-overlay");
const popupContent = document.getElementById("popup-content");

// OUVRIR POPUP
export function openPopup(template) {
  popupContent.innerHTML = template;
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const closeBtn = popupContent.querySelector(".close-btn");

  closeBtn.addEventListener("click", closePopup);
}

// FERMER POPUP
export function closePopup() {
  overlay.classList.add("hidden");
  popupContent.innerHTML = "";
  document.body.style.overflow = "auto";
}

// FERMETURE SI CLIC SUR OVERLAY
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closePopup();
  document.addEventListener("click", (e) => {
    console.log("🔥 CLICK SUR :", e.target);
  });
});

// ============================
// 🔥 EVENT DELEGATION GLOBAL
// ============================
// Fonctionne même si les éléments sont ajoutés APRÈS (base.js, SPA, etc.)
document.addEventListener("click", (e) => {
  const target = e.target;

  if (!(target instanceof HTMLElement)) return;
  console.log("oui recu !");

  // Bouton du footer → ouvrir popup login
  if (target.id === "open-login-popup") {
    e.preventDefault();
    openPopup(loginTemplate);
    console.log("oui recu !");

    document.addEventListener("click", (e) => {
      console.log("🔥 CLICK SUR :", e.target);
      return;
    });
  }



  // Dans template inscription → retour login
  if (target.id === "open-login") {
    e.preventDefault();
    openPopup(loginTemplate);
    console.log("oui recu !");

    return;
  }

  // Dans template login → ouvrir popup inscription
  if (target.id === "open-register") {
    e.preventDefault();
    openPopup(registerTemplate);
    console.log("oui recu !");

    return;
  }
});
