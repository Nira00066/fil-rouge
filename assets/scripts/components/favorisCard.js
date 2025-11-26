/**
 * Crée le HTML pour une carte d'événement basée sur vos classes CSS.
 * * @param {Object} event - L'objet événement retourné par l'API.
 * @returns {string} Le code HTML (string) de la carte.
 */
export function createEventCardHTML(event) {
    // --- 1. Préparation des données ---
    
    // Assurez-vous que les noms des propriétés correspondent à ce que votre API retourne
    const title = event.title || 'Événement non nommé';
    const city = event.city || 'Ville inconnue';
    const price = event.price;
    const imageUrl = event.event_main_image_url || '../images/placeholder.jpg'; // URL d'image par défaut

    // Formatage du prix
    let priceText = 'Gratuit';
    if (price && parseFloat(price) > 0) {
        priceText = `${parseFloat(price).toFixed(2)} euros`;
    }
    
    // Le lien vers la page de l'événement (assumant que l'ID est dans 'event.id')
    const eventUrl = `event.html?id=${event.id || ''}`;
    
    // --- 2. Génération du HTML ---
    
    return `
        <a href="${eventUrl}" class="event_card_link">
            <div class="event_card">
                
                <div 
                    class="event_img" 
                    style="background-image: url('${imageUrl}');"
                >
                </div>
                
                <div class="event_content">
                    <h4>${title}</h4>
                    <p>${priceText}, ${city} FR</p>
                </div>
                
                <button 
                    class="favorite_btn" 
                    data-event-id="${event.id || ''}"
                    aria-label="Ajouter aux favoris"
                >
                    ♥
                </button>
            </div>
        </a>
    `;
}