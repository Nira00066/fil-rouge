import { API_BASE_URL } from "./config.js";
import { createEventCard } from "../components/eventCard.js";


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
      console.log("Appel API :", url);

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
 events.forEach(event => {
  container.appendChild(createEventCard(event));
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
