// assets/scripts/components/header.js

document.addEventListener("DOMContentLoaded", () => {
  const btnCo = document.querySelector(".connexion_btn");
  const token = localStorage.getItem("token");

  if (token) {
    //user connecté
    btnCo.innerHTML = `
      <img src="/assets/img/user.png" alt="Profil" />
      Profil
    `;
    btnCo.onclick = () => {
      window.location.href = "/pages/profil.html";
    };
  } else {
    // Non connecté
    btnCo.innerHTML = `
      <img src="/assets/img/login.png" alt="Connexion" />
      Connexion
    `;
    btnCo.onclick = () => {
      window.location.href = "/pages/connexion.html";
    };
  }
});
