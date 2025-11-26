import { API_BASE_URL } from "./config.js";
import { createEventCard } from "../components/eventCard.js";

async function loadRecentEvents() {
  const container = document.getElementById("events-container");
console.log("JS chargé !");

  if (!container) {
    console.warn("⚠️ Aucun conteneur trouvé avec l'id 'events-container'");
    return;
  }

  try {
    const url = `${API_BASE_URL}/api/evenements/recents?limit=3`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const events = await response.json();
    container.innerHTML = "";

    if (!events || !events.length) {
      container.innerHTML = "<p>Aucun événement récent trouvé 😢</p>";
      return;
    }

   events.forEach(event => {
  container.appendChild(createEventCard(event));
});
  } catch (err) {
    console.error("❌ Erreur de chargement des événements :", err);
    container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadRecentEvents);
