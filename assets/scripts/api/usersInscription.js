// Chemin : ../api/usersInscription.js
import { API_BASE_URL } from "./config.js";


async function submitInscription(e) {
    e.preventDefault();
    
    // 1. Récupération des données
    const data = {
        firstname: document.getElementById("prenom").value.trim(),
        lastname: document.getElementById("nom").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        password: document.getElementById("register-password").value,
        checkPassword: document.getElementById("checkPassword").value,
    };

    console.log(data);
    
    // 2. Validations côté client
    if (!data.firstname || !data.lastname || !data.email || !data.password) {
        alert("⚠️ Merci de remplir tous les champs obligatoires !");
        return;
    }
    
    if (data.password !== data.checkPassword) {
      alert("⚠️ Password pas correct");
        return;
    }
    
    if (data.password.length < 8) {
      alert("⚠️ password pas assez long");
        return;
    }
    
   a // 3. Suppression de checkPassword avant envoi
    delete data.checkPassword;
    
    console.log("Données envoyées à l'API d'inscription:", data);
    
    // showPopup("Création du compte en cours...", "loading", 5000);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/inscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        console.log("Réponse du serveur:", result);
        
        if (!response.ok) {
        const status = response.status;

        if (status === 404 || status === 500) {
          window.location.href = `../pages/error.html?status=${status}`;
          return;
        }

        throw new Error(result.message || `Erreur serveur : ${status}`);
      }

      alert("Compte créé avec succès 🎉");
        
    } catch (err) {
      console.error("ERREUR :", err);
      alert(`Erreur : ${err.message}`);
    }
}

export function handleInscriptionForm() {
    const formInscription = document.getElementById("form-inscription");
    if (!formInscription) {
        console.warn("⚠️ Le formulaire d'inscription n'a pas été trouvé dans le DOM");
        return;
    }
    
    // Suppression de l'ancien listener pour éviter les doublons
    formInscription.removeEventListener("submit", submitInscription);
    formInscription.addEventListener("submit", submitInscription);
    
    console.log("✅ Event listener d'inscription attaché");
}