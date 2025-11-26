export function createEventCard(event) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  // Prix
  const price =
    !event.price || event.price === "0" || event.price === 0
      ? "Gratuit"
      : `${event.price} €`;

  // Description
  const description =
    event.description && event.description.trim() !== ""
      ? event.description
      : "Aucune description disponible.";

  // URL image fallback
  const imageUrl =
    event.event_image_url || "images/events/default-event.jpg";

// Format date
const dateObj = new Date(event.date_start);
const formattedDate = dateObj.toLocaleDateString("fr-FR"); // JJ/MM/AAAA

// Format heure
const hourStart = event.hour_start
  ? event.hour_start.substring(0, 5)
  : "?";





 

  // Catégories
  let categoryClass = "";
  let categoryName = "";

  switch (event.category_id) {
    case 1:
      categoryClass = "competition";
      categoryName = "Compétition & Performance";
      break;
    case 2:
      categoryClass = "Rassemblement";
      categoryName = "Rassemblements & Meets";
      break;
    case 3:
      categoryClass = "mecanique";
      categoryName = "Mécanique & Préparation";
      break;
    case 4:
      categoryClass = "carshow";
      categoryName = "Shows & Festivals";
      break;
    case 5:
      categoryClass = "offroad";
      categoryName = "Offroad & Aventure";
      break;
    case 6:
      categoryClass = "innovation";
      categoryName = "Innovation & Futur";
      break;
    case 7:
      categoryClass = "culture";
      categoryName = "Culture & Lifestyle";
      break;
    default:
      categoryClass = "autre";
      categoryName = "Autre";
  }

// 📌 Lien vers la page event FRONT
// Détecter si on est sur index.html
const isIndexPage =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html";

// Définir le bon lien
const eventLink = isIndexPage
  ? `pages/event.html?id=${event.id}`
  : `event.html?id=${event.id}`;


card.innerHTML = `
  <a href="${eventLink}" class="card" id="event-${event.id}">
    <div class="card-image">
      <img 
        src="./../${imageUrl}"
        onerror="this.onerror=null; this.src='images/events/default-event.jpg';"
        alt="image événement"
      />

      <div class="icons">
        <button aria-label="Ajouter aux favoris">❤</button>
      </div>

      <span class="category-tag ${categoryClass}">
        ${categoryName}
      </span>
    </div>

    <div class="card-body">
      <h3>
        ${event.title}
        <span class="price">${price}</span>
      </h3>

      <p>${description}</p>

      <div class="info">
        <div class="line">📅 ${formattedDate} à ${hourStart}</div>
        <div class="line">📍 ${event.address || "Adresse inconnue"}</div>
        <div class="line">👤 ${event.organization_name || "Organisateur inconnu"}</div>
      </div>

      <button 
        class="btn btn-red view-event-btn"
        onclick="location.href='${eventLink}'"
      >
        Voir l’événement
      </button>
    </div>
  </a>
`;

  return card;
}
