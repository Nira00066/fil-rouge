import { API_BASE_URL } from "./config.js";
// 💡 Assurez-vous d'importer uploadEventImage si elle n'est pas globale
// import { uploadEventImage } from './chemin/vers/uploadImage.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("createvent");
    if (!submitBtn) return

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // 1. Récupération des données du formulaire... (votre code est correct)
        const rules = Array.from(document.querySelectorAll("#rules-list li")).map((el) => el.textContent.trim());
        const services = Array.from(document.querySelectorAll("#services-list li")).map((el) => el.textContent.trim());
        const tags = Array.from(document.querySelectorAll(".tag.selected")).map((el) => el.textContent.trim());

        const eventData = {
            title: document.getElementById("event-title")?.value.trim(),
            category_id: document.getElementById("category")?.value,
            location_id: document.getElementById("city")?.value,
            date_start: document.getElementById("start-date")?.value,
            date_end: document.getElementById("end-date")?.value,
            hour_start: document.getElementById("start-time")?.value,
            hour_end: document.getElementById("end-time")?.value,
            price: document.getElementById("price")?.value.trim(),
            address: document.getElementById("address")?.value.trim(),
            description: document.getElementById("event-description")?.value.trim(),
            phone: document.getElementById("phone")?.value.trim(),
            email: document.getElementById("email")?.value.trim(),
            website_url: document.getElementById("website")?.value.trim(),
            social_name: document.getElementById("social")?.value.trim(),
            organization_name: document.getElementById("organizer-name")?.value.trim(),
            organization_description: document.getElementById("org-description")?.value.trim(),
            event_rules: rules,
            available_services: services,
            tags: tags,
        };

        // ⚠️ Vérif des champs obligatoires
        if (
            !eventData.title || !eventData.category_id || !eventData.location_id ||
            !eventData.date_start || !eventData.date_end
        ) {
            alert("⚠️ Merci de remplir tous les champs obligatoires !");
            return;
        }

        // -----------------------------------------------------------------
        // 2. Gestion de l'authentification et de l'upload (JWT)
        // -----------------------------------------------------------------
        
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("🔒 Session expirée ou non connecté. Veuillez vous reconnecter.");
            window.location.href = "/login.html"; 
            return;
        }

        try {
            // 📸 Upload de l'image (si un fichier a été sélectionné)
            const imageId = await uploadEventImage();
            eventData.event_image_id = imageId;

            // -----------------------------------------------------------------
            // 3. Soumission de l'événement
            // -----------------------------------------------------------------

            const response = await fetch(`${API_BASE_URL}/api/evenements`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            const result = await response.json();

            // -----------------------------------------------------------------
            // 4. Contrôle des erreurs HTTP
            // -----------------------------------------------------------------
            if (!response.ok) {
                const status = response.status;
                
                // A. Erreurs critiques (404/500) -> Redirection vers error.html
                if (status === 404 || status === 500) {
                    console.error(`Redirection pour erreur ${status}`);
                    window.location.href = `../pages/error.html?status=${status}`;
                    return; // Arrête l'exécution après la redirection
                }
                
                // B. Erreurs de validation/authentification (400, 401, 403, 409) -> Affichage du message du serveur
                // Le message d'erreur est dans 'result.message'
                throw new Error(result.message || `Erreur serveur : ${status}`);
            }

            // -----------------------------------------------------------------
            // 5. Succès
            // -----------------------------------------------------------------
            
            alert("✅ Événement créé avec succès !");
            console.log("Réponse du serveur :", result);
            // 💡 Rediriger vers la page de l'événement créé ou la liste
            window.location.href = "/events.html"; 
            
        } catch (err) {
            // 🚨 Capture les erreurs d'upload d'image ET les erreurs de validation/message du serveur
            console.error("💥 ERREUR DANS createEvent :", err);
            
            // Afficher le message d'erreur (provenant de l'upload ou de result.message)
            alert(`Erreur : ${err.message}`);
        }
    });
});