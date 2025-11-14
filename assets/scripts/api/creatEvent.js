import { API_BASE_URL } from "./config.js";


document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("createvent");
if (!submitBtn) return
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // 🧩 Récupération des listes dynamiques
    const rules = Array.from(document.querySelectorAll("#rules-list li")).map(
      (el) => el.textContent.trim()
    );

    const services = Array.from(
      document.querySelectorAll("#services-list li")
    ).map((el) => el.textContent.trim());

    // ✅ Correction ici : .active → .selected
    const tags = Array.from(document.querySelectorAll(".tag.selected")).map(
      (el) => el.textContent.trim()
    );

    console.log("Tags envoyés :", tags); // 💡 pour vérifier avant envoi

    // 🧠 Récupération des champs du formulaire
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
      organization_name: document
        .getElementById("organizer-name")
        ?.value.trim(),
      organization_description: document
        .getElementById("org-description")
        ?.value.trim(),
      event_rules: rules,
      available_services: services,
      tags: tags, // 👈 les tags sélectionnés
    };

    // ⚠️ Vérif des champs obligatoires
    if (
      !eventData.title ||
      !eventData.category_id ||
      !eventData.location_id ||
      !eventData.date_start ||
      !eventData.date_end
    ) {
      alert("⚠️ Merci de remplir tous les champs obligatoires !");
      return;
    }

    try {
      //   const token = localStorage.getItem("token");
      console.log("📦 Données envoyées :", eventData);
      const imageId = await uploadEventImage();
      eventData.event_image_id = imageId; // 📸 ON AJOUTE L'IMAGE À L'ÉVENT

      const response = await fetch(`${API_BASE_URL}/evenements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Erreur lors de la création");

      alert("✅ Événement créé avec succès !");
      console.log("Réponse du serveur :", result);
      window.location.href = "/events.html";
    } catch (err) {
      console.error("💥 ERREUR DANS createEvent :", err);
      if (err.stack) console.error("📜 Stack :", err.stack);

      alert("Erreur serveur !");
    }
  });
});
