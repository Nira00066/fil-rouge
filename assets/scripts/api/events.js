import { API_BASE_URL } from "./config.js";

async function loadRecentEvents() {
  const container = document.getElementById("events-container");

  // Vérifie que le conteneur existe
  if (!container) {
    console.warn("⚠️ Aucun conteneur trouvé avec l'id 'events-container'");
    return;
  }

  try {
    // 💡 CORRECTION : Utilisation de API_BASE_URL pour construire l'URL complète
    const url = `${API_BASE_URL}/evenements?limit=3`;
    const response = await fetch(url);
    // ; <-- Ligne vide supprimée (aucune erreur, mais inutile)

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    // Récupère les données JSON
    const events = await response.json();

    // Vide le conteneur avant d'ajouter les nouvelles cartes
    container.innerHTML = "";

    // Si aucun événement trouvé
    if (!events || !events.length) { // 💡 AMÉLIORATION : Vérifie également si 'events' est null/undefined
      container.innerHTML = "<p>Aucun événement récent trouvé 😢</p>";
      return;
    }

    // Boucle sur chaque événement
events.forEach((event) => {
  const card = document.createElement("div");
  card.classList.add("cardMett");

  const eventLink = `/evenements?limit=3`; // si tu as une page par event

  card.innerHTML = `
    <a href="${eventLink}" class="cardMett_link">
      <div class="cardMett_img">
        <span class="cardMett_tag">Catégorie #${event.category_id || "?"}</span>
        <button class="cardMett_heart" aria-label="Ajouter aux favoris">❤</button>
        <img src="${event.event_image_id ? `./images/event-${event.event_image_id}.jpg` : "./images/default-event.jpg"}"
             alt="${event.title}" />
      </div>
      <div class="cardMett_description">
        <h3>${event.title}</h3>
        <p class="date">📅 ${new Date(event.date_start).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}</p>
        <p class="lieu">📍 ${event.address}</p>
        <p class="participants">💸 ${event.price} €</p>
      </div>
      <div class="cardMett_btn">
        <button>Voir l'événement</button>
      </div>
    </a>
  `;

});
container.appendChild(card);

  } catch (err) {
    console.error("❌ Erreur de chargement des événements :", err);
    container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
  }
}

// Lancement automatique quand la page est chargée
document.addEventListener("DOMContentLoaded", loadRecentEvents);