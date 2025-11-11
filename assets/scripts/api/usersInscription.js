import { API_BASE_URL } from "./config.js";
import { showPopup } from "../components/popup.js";


const formInscription = document.getElementById("form-inscription");



if (formInscription) {
  formInscription.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formInscription).entries());

    if (data.password !== data.checkPassword) {
      showPopup("Les mots de passe ne correspondent pas 😅", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/inscription`, {
        method: "POST",
         headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        showPopup("Compte créé avec succès 🎉", "success");
console.log("✅ popup chargé :", showPopup);
      
      setTimeout(() => {
        window.location.href = "connexion.html";
        showPopup("Compte créé avec succès 🎉", "success");
      }, 3500);
    } catch (err) {
      console.error(err);
      showPopup("Erreur lors de la création du compte 😬", "error");
    }
  });
}
