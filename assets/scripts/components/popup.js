export function showPopup(message, type = "success") {
  // Crée le conteneur principal si pas déjà présent
  let popupContainer = document.querySelector(".popup-container");
  if (!popupContainer) {
    popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    document.body.appendChild(popupContainer);
  }

  // Crée le popup
  const popup = document.createElement("div");
  popup.className = `popup ${type}`; // type = success | error | info
  popup.innerHTML = `
    <p>${message}</p>
    <button class="popup-close">&times;</button>
  `;

  // Ajoute le popup au conteneur
  popupContainer.appendChild(popup);

  // Animation d’apparition
  setTimeout(() => popup.classList.add("show"), 10);

  // Fermeture manuelle
  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  });

  // Fermeture auto après 3 secondes
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}
