import { API_BASE_URL } from "./config.js";
import { showPopup } from "../components/popup.js";

const formConnexion = document.getElementById("form-connexion");

if (formConnexion) {
  formConnexion.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(formConnexion).entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      console.log("✅ popup chargé :", showPopup);
      showPopup("Connexion réussie 🎉", "success");

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } catch (err) {
      console.error(err);
      showPopup("Erreur de connexion 😬", "error");
    }
  });
}
