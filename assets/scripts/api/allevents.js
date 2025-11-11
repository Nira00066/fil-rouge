import { API_BASE_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🧭 Sélecteurs propres
  const inputSearch = document.getElementById("searchInput");
  const selectCategory = document.getElementById("categoryFilter");
  const selectDate = document.getElementById("dateFilter");
  const selectCity = document.getElementById("cityFilter");
  const clearBtn = document.querySelector(".clear-button");
  const resultCount = document.getElementById("eventCount");
  const container = document.getElementById("all-events");

  // 🔥 Fonction principale : charge les événements selon les filtres
  async function loadFilteredEvents() {
    try {
      container.innerHTML = `<p>Chargement...</p>`;

      // Récupération des valeurs des filtres
      const search = inputSearch.value.trim();
      const category = selectCategory.value;
      const dateFilter = selectDate.value;
      const city = selectCity.value;

      // Construction dynamique de l'URL
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "all") params.append("category", category);
      if (dateFilter && dateFilter !== "all") params.append("date", dateFilter);
      if (city && city !== "all") params.append("city", city);

      const url = `${API_BASE_URL}/evenements?${params.toString()}`;
      console.log("🔗 Appel API :", url);

      // Requête à l’API
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

      const events = await response.json();
      if (!Array.isArray(events))
        throw new Error("Format de données incorrect");

      // Affichage des événements
      displayEvents(events);
      resultCount.textContent = `${events.length} événement${
        events.length > 1 ? "s" : ""
      } trouvé${events.length > 1 ? "s" : ""}`;
    } catch (err) {
      console.error("Erreur de chargement :", err);
      container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
      resultCount.textContent = "0 événement trouvé";
    }
  }

  // 🎨 Fonction d’affichage des événements
  function displayEvents(events) {
    container.innerHTML = "";

    if (!events.length) {
      container.innerHTML = `<p>Aucun événement trouvé 😢</p>`;
      return;
    }

    events.forEach((event) => {
      const eventLink = `/evenements/${event.id}`;
      const price =
        parseFloat(event.price) === 0 ? "Gratuit" : `${event.price} €`;
      const date = new Date(event.date_start).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Définir classe et nom de catégorie selon l’ID
      let categoryClass = "";
      let categoryName = "";
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
          categoryClass = "carshow";
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

      // Création de la carte
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
        <a href="${eventLink}" class="card" id="event-${event.id}">
          <div class="card-image">
            <img
              src="${
                event.event_image_id
                  ? `./images/events/small/event-${event.event_image_id}.webp`
                  : "../images/default-event.jpg"
              }"
              alt="${event.title}"
            />
            <span class="category-tag ${categoryClass}">${categoryName}</span>
          </div>
          <div class="card-body">
            <h3>${event.title} <span class="price">${price}</span></h3>
            <p>${event.description || "Aucune description disponible."}</p>
            <div class="info">
              <div class="line">📅 ${date} à ${event.hour_start || "?"}</div>
              <div class="line">📍 ${event.address || "Adresse inconnue"}</div>
              <div class="line">👤 ${
                event.organization_name || "Organisateur inconnu"
              }</div>
            </div>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  }

  // 🧠 Gestion des filtres dynamiques
  inputSearch.addEventListener("input", debounce(loadFilteredEvents, 400));
  selectCategory.addEventListener("change", loadFilteredEvents);
  selectDate.addEventListener("change", loadFilteredEvents);
  selectCity.addEventListener("change", loadFilteredEvents);

  // 🔄 Réinitialiser les filtres
  clearBtn.addEventListener("click", () => {
    inputSearch.value = "";
    selectCategory.selectedIndex = 0;
    selectDate.selectedIndex = 0;
    selectCity.selectedIndex = 0;
    loadFilteredEvents();
  });

  // 🚀 Chargement initial
  loadFilteredEvents();
});

// 🔁 Fonction debounce — évite de spammer l’API pendant la frappe
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
