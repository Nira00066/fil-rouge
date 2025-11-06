import { API_BASE_URL } from "./config.js";
import { showPopup } from "./components/popup.js";

const form = document.getElementById("form-inscription");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    if (data.password !== data.checkPassword) {
      showPopup("Les mots de passe ne correspondent pas 😅", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

      showPopup("Compte créé avec succès 🎉", "success");

      setTimeout(() => {
        window.location.href = "connexion.html";
      }, 1500);
    } catch (err) {
      console.error(err);
      showPopup("Erreur lors de la création du compte 😬", "error");
    }
  });
}
