import { loginTemplate } from "../components/modaLogin.js";
import { registerTemplate } from "../components/modalInscription.js";
import { handleInscriptionForm } from "../api/usersInscription.js";
import { handleConnexionForm } from "../api/userConnexion.js";

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
export function closePopup() {
  overlay.classList.add("hidden");
  popupContent.innerHTML = "";
  document.body.style.overflow = "auto";
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closePopup();
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (!(target instanceof HTMLElement)) return;
  console.log("oui recu !");

  // Bouton du footer → ouvrir popup login
  if (target.id === "open-login-popup") {
    e.preventDefault();
    openPopup(loginTemplate);
    console.log("popup connection ouvert ");
    handleConnexionForm();

    document.addEventListener("click", (e) => {
      console.log("🔥 CLICK SUR :", e.target);
      return;
    });
  }
  if (target.id === "open-login") {
    e.preventDefault();
    openPopup(loginTemplate);
    handleConnexionForm();
    console.log("popup connection ouvert ");
    return;
  }
  if (target.id === "open-register") {
    e.preventDefault();
    openPopup(registerTemplate);
    handleInscriptionForm();
    console.log("popup inscription ouvert");
    return;
  }
});
