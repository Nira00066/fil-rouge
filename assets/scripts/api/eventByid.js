import { API_BASE_URL } from "./config.js";
function populateList(elementId, itemsString) {
    const ulElement = document.getElementById(elementId);
    if (!ulElement) return;

    ulElement.innerHTML = ''; // Nettoyer avant d'ajouter
    
    let items = [];

    // Tente de parser le JSON (pour les listes stockées comme JSON dans la DB)
    try {
        const parsed = JSON.parse(itemsString);
        if (Array.isArray(parsed)) {
            items = parsed;
        } else {
            // Si le parsing fonctionne mais ce n'est pas un tableau, on revient au split
            throw new Error('Not an array'); 
        }
    } catch (e) {
        // Traiter la chaîne comme une liste simple séparée par des virgules (ex: "Tuning,Classic")
        if (itemsString && typeof itemsString === 'string') {
            items = itemsString.split(',').map(item => item.trim()).filter(item => item.length > 0);
        }
    }

    if (items.length > 0) {
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ulElement.appendChild(li);
        });
    } else {
         const li = document.createElement('li');
         li.textContent = "Aucune information disponible.";
         ulElement.appendChild(li);
    }
}

/**
 * Récupère les données de l'événement depuis l'API.
 * @param {string} eventId - L'ID de l'événement.
 * @returns {Promise<Object>} Les données de l'événement.
 */
async function fetchEventData(eventId) {
    // Le chemin que vous avez spécifié : /api/evenements/{id}
    const response = await fetch(`${API_BASE_URL}/api/evenements/${eventId}`); 
    
    if (!response.ok) {
        // Lance une erreur si la réponse HTTP n'est pas 200-299
        throw new Error(`Erreur de récupération des données : ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

// --- LOGIQUE PRINCIPALE D'AFFICHAGE ---

async function loadEventData() {
    const titleElement = document.getElementById('event-title');
    // Afficher un état initial de chargement
    if(titleElement) titleElement.textContent = "Chargement en cours...";
    
    // 1. Récupération de l'ID depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id'); // Récupère l'ID après '?' dans l'URL (ex: event.html?id=2)

    if (!eventId) {
        if(titleElement) titleElement.textContent = "Erreur: ID de l'événement manquant dans l'URL.";
        return;
    }

    let eventData;
    try {
        // 2. FETCH et récupération des données
        eventData = await fetchEventData(eventId);
        console.log("Données récupérées avec succès :", eventData);

        if (!eventData || Object.keys(eventData).length === 0) {
            if(titleElement) titleElement.textContent = "Événement non trouvé ou données vides.";
            return;
        }

    } catch (error) {
        console.error("Erreur critique lors du chargement :", error);
        if(titleElement) titleElement.textContent = `Erreur de connexion à l'API. Vérifiez l'URL de base. (${error.message})`;
        return;
    }

    // --- 3. INJECTION DES DONNÉES SIMPLES (TEXTE & LIENS) ---

    // Titres et Meta
    document.getElementById('page-title').textContent = `${eventData.title} – NovaMeet`;
    document.getElementById('event-title').textContent = eventData.title || 'Non spécifié';
    
    // Prix
    document.getElementById('event-price').textContent = eventData.price ? 
        (parseFloat(eventData.price) > 0 ? `${parseFloat(eventData.price).toFixed(2)} €` : 'Gratuit') 
        : 'Prix non spécifié';

    // Description et Adresse
    document.getElementById('event-description').textContent = eventData.description || 'Description non disponible.';
    document.getElementById('event-address').textContent = eventData.address || 'Non spécifiée';

    // Image principale
    const mainImageElement = document.getElementById('event-main-image');
    if (mainImageElement && eventData.event_main_image_url) {
        // Assurez-vous que ce chemin est correct par rapport à votre dossier d'images
        mainImageElement.src = `../${eventData.event_main_image_url}`; 
        mainImageElement.alt = `Image principale de l'événement ${eventData.title}`;
    }

    // Organisateur et Contact
    document.getElementById('event-org-name').textContent = eventData.organization_name || 'Non spécifié';
    document.getElementById('event-org-desc').textContent = eventData.organization_description || 'Non spécifié';
    document.getElementById('event-phone').textContent = eventData.phone || 'Non spécifié';
    document.getElementById('event-email').textContent = eventData.email || 'Non spécifié';
    
    const websiteLink = document.getElementById('event-website');
    if (websiteLink && eventData.website_url) {
        // Ajout de https:// si manquant pour créer un lien valide
        const fullUrl = eventData.website_url.startsWith('http') ? eventData.website_url : `https://${eventData.website_url}`;
        websiteLink.href = fullUrl;
        websiteLink.textContent = eventData.website_url;
    } else if (websiteLink) {
        websiteLink.textContent = "Non spécifié";
        websiteLink.removeAttribute('href'); // Supprime le href s'il n'y a pas d'URL
    }

    // Date de création
    if (eventData.created_at) {
        const createdAt = new Date(eventData.created_at).toLocaleDateString('fr-FR');
        document.getElementById('event-created-at').textContent = `Publié le ${createdAt}`;
    }

    // --- 4. INJECTION DES DONNÉES COMPLEXES (DATES & LISTES) ---

    // Dates
    if (eventData.date_start && eventData.date_end) {
        const dateStart = new Date(eventData.date_start);
        const dateEnd = new Date(eventData.date_end);

        let dateStr;
        if (dateStart.toDateString() === dateEnd.toDateString()) {
            dateStr = dateStart.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
        } else {
            const startStr = dateStart.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' });
            const endStr = dateEnd.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
            dateStr = `Du ${startStr} au ${endStr}`;
        }
        document.getElementById('event-date').textContent = dateStr;
    }

    // Heures
    if (eventData.hour_start && eventData.hour_end) {
        const hStart = eventData.hour_start.substring(0, 5);
        const hEnd = eventData.hour_end.substring(0, 5);
        document.getElementById('event-hours').textContent = `${hStart} à ${hEnd}`;
    }
    
    // Tags, Services et Réglementations (utilisation de la fonction populateList)
    populateList('event-tags', eventData.event_tags);
    populateList('event-services', eventData.available_services);
    populateList('event-rules', eventData.event_rules);
}

// Déclenche le chargement des données une fois que le HTML est complètement chargé
document.addEventListener('DOMContentLoaded', loadEventData);