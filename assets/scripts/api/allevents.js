import { API_BASE_URL } from "./config.js";

async function LoadAllEvents() {
  const container = document.getElementById("all-events");

  if (!container) {
    console.warn("Aucun container trouvé avec cet ID.");
    return;
  }

  try {
    const url = `${API_BASE_URL}/evenements`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const Events = await response.json();
    container.innerHTML = "";

    if (!Events || Events.length === 0) {
      container.innerHTML = "<p>Aucun événement trouvé</p>";
      return;
    }

    Events.forEach((event) => {
      const eventLink = `/evenements/${event.id}`;
      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <a href="${eventLink}" class="card" id="event-${event.id}">
          <div class="card-image">
            <img
              src="${
                event.event_image_id
                  ? `./images/events/small/affiche-tourauto-2025.webp`
                  : "../images/default-event.jpg"
              }"
              alt="${event.title || "Événement"}"
            />
            <span class="category-tag ${event.categoryClass || "Exposition"}">
              ${event.categoryName || "Exposition"}
            </span>
            <span class="distance">${event.distance || "10.5 km"}</span>
            <div class="icons">
              <button aria-label="Ajouter aux favoris">♥</button>
              <button aria-label="Copier le lien">🔗</button>
            </div>
          </div>

          <div class="card-body">
            <h3>
              ${event.title || "Rassemblement BMW Classic"}
              <span class="price">${event.price || "Gratuit"}</span>
            </h3>
            <p>${
              event.description ||
              "Retrouvez-nous pour un rassemblement exceptionnel de BMW classiques…"
            }</p>

            <div class="info">
              <div class="line">📅 ${event.date || "25 Jan 2025 à 10:00"}</div>
              <div class="line">📍 ${
                event.location || "Château de Vincennes, Paris"
              }</div>
              <div class="line">👥 ${
                event.participants || "75/100 participants"
              }</div>
            </div>

            <div class="tags">
              ${(event.tags || ["BMW", "Classic", "Rassemblement"])
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}
            </div>

            <div class="actions">
              <button class="btn voir-plus" data-id="${
                event.id || 1
              }">Voir plus</button>
              <button class="btn participer">Participer</button>
            </div>
          </div>
        </a>
      `;

      container.appendChild(card);
    });

    // gestion des boutons
    document.querySelectorAll(".voir-plus").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const eventId = e.target.dataset.id;
        window.location.href = `/evenements/${eventId}`;
      });
    });
  } catch (err) {
    console.error("❌ Erreur de chargement des événements :", err);
    container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
  }
}

document.addEventListener("DOMContentLoaded", LoadAllEvents);
