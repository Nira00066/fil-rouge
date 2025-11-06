export function showPopup(message, type = "info") {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;

  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.padding = "12px 20px";
  popup.style.borderRadius = "10px";
  popup.style.color = "#fff";
  popup.style.fontWeight = "bold";
  popup.style.zIndex = "9999";
  popup.style.transition = "opacity 0.5s ease";

  switch (type) {
    case "success":
      popup.style.background = "#28a745";
      break;
    case "error":
      popup.style.background = "#dc3545";
      break;
    default:
      popup.style.background = "#007bff";
  }

  document.body.appendChild(popup);

  setTimeout(() => (popup.style.opacity = "0"), 2000);
  setTimeout(() => popup.remove(), 2500);
}
