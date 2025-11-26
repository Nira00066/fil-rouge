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

    const params = new URLSearchParams(window.location.search);

    const preselectedCategory = params.get("category");

    if (preselectedCategory && selectCategory) {
        selectCategory.value = preselectedCategory;
        console.log("Catégorie préselectionnée :", preselectedCategory);
    }

    // 🔥 Fonction principale : charge les événements selon les filtres
    async function loadFilteredEvents() {
        try {
            // S'assurer que le conteneur existe avant de le manipuler
         if (!container) {
                // Cette console.error est facultative, mais utile pour le débogage
                // console.error("Conteneur 'all-events' introuvable. Skip la fonction de chargement.");
                return; 
            }
container.innerHTML = `<p>Chargement...</p>`;
            // Récupération des valeurs des filtres (utiliser la vérification pour éviter les crashs)
            const search = inputSearch ? inputSearch.value.trim() : '';
            const category = selectCategory ? selectCategory.value : '';
            const dateFilter = selectDate ? selectDate.value : '';
            const city = selectCity ? selectCity.value : '';

            // Construction dynamique de l'URL
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (category && category !== "all") params.append("category", category);
            if (dateFilter && dateFilter !== "all") params.append("date", dateFilter);
            if (city && city !== "all") params.append("city", city);

            const url = `${API_BASE_URL}/api/evenements?${params.toString()}`;
            console.log("Appel API :", url);

            // Requête à l’API
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

            const events = await response.json();
            if (!Array.isArray(events))
                throw new Error("Format de données incorrect");

            // Affichage des événements
            displayEvents(events);

            if (resultCount) {
                resultCount.textContent = `${events.length} événement${
                    events.length > 1 ? "s" : ""
                } trouvé${events.length > 1 ? "s" : ""}`;
            }
        } catch (err) {
            console.error("Erreur de chargement :", err);
            if (container) container.innerHTML = `<p>Impossible de charger les événements 😬</p>`;
            if (resultCount) resultCount.textContent = "0 événement trouvé";
        }
    }

    // 🎨 Fonction d’affichage des événements
    function displayEvents(events) {
        if (!container) return; // S'assurer que le conteneur est là

        container.innerHTML = "";

        if (!events.length) {
            container.innerHTML = `<p>Aucun événement trouvé 😢</p>`;
            return;
        }
        events.forEach((event) => {
            // Assurez-vous que createEventCard retourne bien un nœud DOM (HTMLElement)
            container.appendChild(createEventCard(event)); 
        });
    }

    // ===============================================
    // 🖱️ GESTION DES ÉCOUTEURS D'ÉVÉNEMENTS (CORRIGÉ)
    // ===============================================

    // 1. Champ de recherche (Input)
    if (inputSearch) {
        // La fonction debounce est utilisée pour limiter les appels API lors de la frappe rapide
        inputSearch.addEventListener("input", debounce(loadFilteredEvents, 400));
    }

    // 2. Sélecteurs (Change)
    if (selectCategory) {
        selectCategory.addEventListener("change", loadFilteredEvents);
    }
    if (selectDate) {
        selectDate.addEventListener("change", loadFilteredEvents);
    }
    if (selectCity) {
        selectCity.addEventListener("change", loadFilteredEvents);
    }

    // 3. Bouton de Réinitialisation (Clear Button)
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            // VÉRIFICATION NÉCESSAIRE : On s'assure que chaque élément existe avant de modifier sa valeur
            if (inputSearch) {
                inputSearch.value = "";
            }
            if (selectCategory) {
                selectCategory.selectedIndex = 0;
            }
            if (selectDate) {
                selectDate.selectedIndex = 0;
            }
            if (selectCity) {
                selectCity.selectedIndex = 0;
            }
            
            // Finalement, recharger les événements avec les filtres réinitialisés
            loadFilteredEvents();
        });
    } else {
        console.warn("Le bouton de réinitialisation (clearBtn) est manquant. L'écouteur de clic n'est pas attaché.");
    }
    
    // 4. Appel initial pour charger les événements au démarrage
    loadFilteredEvents();

}); // <-- FERMETURE CORRECTE DE document.addEventListener("DOMContentLoaded")

// 🔁 Fonction debounce — évite de spammer l’API pendant la frappe
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}