// ---- GESTION DES ÉTAPES DU FORMULAIRE ----
const etapes = document.querySelectorAll("[data-id-form]");
const btnSuivant = document.getElementById("eventSuivant");
const btnValider = document.getElementById("eventAdd");

if (btnSuivant && etapes.length > 0) {
  btnSuivant.addEventListener("click", function (e) {
    e.preventDefault();

    const active = document.querySelector("[data-id-form].active");
    const currentIndex = Array.from(etapes).indexOf(active);

    if (currentIndex < etapes.length - 1) {
      active.classList.remove("active");
      etapes[currentIndex + 1].classList.add("active");
    }

    if (currentIndex + 1 === etapes.length - 1) {
      btnSuivant.classList.replace("btn", "btn_hidden");
      btnValider.classList.replace("btn_hidden", "btn");
    }
  });
}

// ---- GESTION DU CHAMP DE FIN DE DATE ----
function toggleEndDate() {
  console.log("ici 1");
  const checkbox = document.getElementById("multiple-dates");
  const endDateGroup = document.getElementById("end-date-group");

  if (!checkbox || !endDateGroup) return;

  endDateGroup.style.display = checkbox.checked ? "flex" : "none";

  // Au clic, mettre à jour l'affichage
  checkbox.addEventListener("change", () => {
    endDateGroup.style.display = checkbox.checked ? "flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", toggleEndDate);

// ---- GESTION DES TABS ----
function initTabs() {
  console.log("initTabs lancé");

  const tabButtons = document.querySelectorAll(".tabs button");
  const tabSections = document.querySelectorAll(".tab-section");

  if (!tabButtons.length || !tabSections.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Enlève "active" de tous les boutons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Cache toutes les sections
      tabSections.forEach((section) => (section.style.display = "none"));

      // Montre la section correspondanten
      const targetId = button.getAttribute("data-tab");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";
    });
  });
}

document.addEventListener("DOMContentLoaded", initTabs);
