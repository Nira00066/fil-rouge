import { API_BASE_URL } from "./config.js";

async function loadRecentEvents() {
  const container = document.getElementById("events-container");

  if (!container) {
    console.warn("⚠️ Aucun conteneur trouvé avec l'id 'events-container'");
    return;
  }

  try {
    const url = `${API_BASE_URL}/evenements/recents?limit=3`;
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

    // 🔁 Boucle sur chaque événement
    events.forEach((event) => {
      let categoryClass = "";
      let categoryName = "";

      // 🎯 Switch selon l'ID de la catégorie (correspondance avec ton CSS)
      switch (event.category_id) {
        case 1:
          categoryClass = "competition";
          categoryName = "Compétition & Performance";
          break;
        case 2:
          categoryClass = "Rassemblement";
          categoryName = "Rassemblements & Meets";
          break;
        case 3:
          categoryClass = "mecanique";
          categoryName = "Mécanique & Préparation";
          break;
        case 4:
          categoryClass = "CarShow";
          categoryName = "Shows & Festivals";
          break;
        case 5:
          categoryClass = "offroad";
          categoryName = "Offroad & Aventure";
          break;
        case 6:
          categoryClass = "innovation";
          categoryName = "Innovation & Futur";
          break;
        case 7:
          categoryClass = "culture";
          categoryName = "Culture & Lifestyle";
          break;
        default:
          categoryClass = "autre";
          categoryName = "Autre";
      }

      // 🔗 Lien vers la page détail
      const eventLink = `/evenements/${event.id}`;

      // 🧱 Construction de la carte
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
        <a href="${eventLink}" class="card" id="eventId">
          <div class="card-image">
            <span class="category-tag ${categoryClass}">${categoryName}</span>
            <div class="icons">
              <button aria-label="Ajouter aux favoris">❤</button>
            </div>
            <img src="${
              event.event_image_id
                ? `./images/event-${event.event_image_id}.jpg`
                : "../images/default-event.jpg"
            }" alt="${event.title}" />
          </div>
          <div class="card-body">
            <h3>${event.title}</h3>
            <p class="date">${new Date(event.date_start).toLocaleDateString(
              "fr-FR",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}</p>
            <p class="lieu">${event.address}</p>
            <p class="participants">${event.price} €</p>
            <div class="actions">
              <button class="btn voir-plus" data-id="${
                event.id
              }">Voir l'événement</button>
            </div>
          </div>
        </a>
      `;

      container.appendChild(card);

      document.querySelectorAll(".voir-plus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const eventId = e.target.dataset.id;
          window.location.href = `/evenements/${eventId}`;
        });
      });
    });
  } catch (err) {
    console.error("❌ Erreur de chargement des événements :", err);
    container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadRecentEvents);
