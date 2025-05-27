const etapes = document.querySelectorAll("[data-id-form]");
const btnSuivant = document.getElementById("eventSuivant");
const btnValider = document.getElementById("eventAdd");

if (btnSuivant) {
  btnSuivant.addEventListener("click", function (e) {
    e.preventDefault();
    //   empecher de faire une direction sur le lien   e.preventDefault();

    const active = document.querySelector("[data-id-form].active");

    const currentIndex = Array.from(etapes).indexOf(active);
    console.log(currentIndex);
    if (currentIndex < etapes.length - 1) {
      active.classList.remove("active");
      etapes[currentIndex + 1].classList.add("active");
    }
    if (currentIndex + 1 === etapes.length - 1) {
      // btnSuivant.classList.remove("btn");
      // btnSuivant.classList.add("btn_hidden");
      btnSuivant.classList.replace("btn", "btn_hidden");
      btnValider.classList.replace("btn_hidden", "btn");

      // btnValider.classList.add("btn_hidden");
      // btnValider.classList.remove("btn");
    }
  });
}
