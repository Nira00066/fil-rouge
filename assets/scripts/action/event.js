// const etapes = document.querySelectorAll("[data-id-form]");
// const btnSuivant = document.getElementById("eventSuivant");
// const btnValider = document.getElementById("eventAdd");

// if (btnSuivant) {
//   btnSuivant.addEventListener("click", function (e) {
//     e.preventDefault();
//     //   empecher de faire une direction sur le lien   e.preventDefault();

//     const active = document.querySelector("[data-id-form].active");

//     const currentIndex = Array.from(etapes).indexOf(active);
//     console.log(currentIndex);
//     if (currentIndex < etapes.length - 1) {
//       active.classList.remove("active");
//       etapes[currentIndex + 1].classList.add("active");
//     }
//     if (currentIndex + 1 === etapes.length - 1) {
//       // btnSuivant.classList.remove("btn");
//       // btnSuivant.classList.add("btn_hidden");
//       btnSuivant.classList.replace("btn", "btn_hidden");
//       btnValider.classList.replace("btn_hidden", "btn");

//       // btnValider.classList.add("btn_hidden");
//       // btnValider.classList.remove("btn");
//     }
//   });
// }

function toggleEndDate() {
  console.log('ici 1');
  const checkbox = document.getElementById("multiple-dates");
  const endDateGroup = document.getElementById("end-date-group");
  endDateGroup.style.display = checkbox.checked ? "flex" : "none";
}
document.addEventListener("DOMContentLoaded", toggleEndDate);


function initTabs() {
  console.log("oui recu");

function initTabs() {
  console.log("oui recu");

  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      // Supprimer la classe active sur tous les boutons
      document
        .querySelectorAll(".tabs button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      console.log("oui recu");

      // Cacher toutes les sections
      document
        .querySelectorAll(".tab-section")
        .forEach((section) => (section.style.display = "none"));
      console.log("oui recu");

      // Afficher la section ciblée
      const targetId = button.getAttribute("data-tab");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";
    });
  });
}

// Optionnel: exécuter dès que le DOM est prêt
document.addEventListener("DOMContentLoaded",initTabs);
console.log("oui recu");
// 
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      // Supprimer la classe active sur tous les boutons
      document
        .querySelectorAll(".tabs button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      console.log("oui recu");

      // Cacher toutes les sections
      document
        .querySelectorAll(".tab-section")
        .forEach((section) => (section.style.display = "none"));
      console.log("oui recu");

      // Afficher la section ciblée
      const targetId = button.getAttribute("data-tab");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";
    });
  });
}

// Optionnel: exécuter dès que le DOM est prêt
document.addEventListener("DOMContentLoaded",initTabs);
console.log("oui recu");
