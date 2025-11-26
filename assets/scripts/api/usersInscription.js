// Chemin : ../api/usersInscription.js
import { API_BASE_URL } from "./config.js";
import { showPopup, closePopup, openPopup, loginTemplate } from "../components/popup.js";

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
    
    // 2. Validations côté client
    if (!data.firstname || !data.lastname || !data.email || !data.password) {
        showPopup("Tous les champs sont obligatoires 😅", "error");
        return;
    }
    
    if (data.password !== data.checkPassword) {
        showPopup("Les mots de passe ne correspondent pas 😅", "error");
        return;
    }
    
    if (data.password.length < 8) {
        showPopup("Le mot de passe doit contenir au moins 8 caractères 😅", "error");
        return;
    }
    
    // 3. Suppression de checkPassword avant envoi
    delete data.checkPassword;
    
    console.log("Données envoyées à l'API d'inscription:", data);
    
    showPopup("Création du compte en cours...", "loading", 5000);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/inscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        console.log("Réponse du serveur:", result); // 🔍 Debug
        
        if (!response.ok) {
            const errorMessage = result.message || `Erreur HTTP : ${response.status}. L'email est peut-être déjà utilisé.`;
            throw new Error(errorMessage);
        }
        
        // --- SUCCÈS ---
        showPopup("Compte créé avec succès 🎉. Connectez-vous maintenant.", "success");
        
        setTimeout(() => {
            closePopup(); 
            openPopup(loginTemplate, { topUp: true }); 
        }, 3500);
        
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err);
        showPopup(`Erreur : ${err.message || "Erreur de connexion réseau."} 😬`, "error");
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