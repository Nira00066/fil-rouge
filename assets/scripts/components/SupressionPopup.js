
export const SuppresionTemplate = (title, message) => `
<div class="popup-content account-success-popup">
    
    <button class="close-btn material-symbols-outlined" id="close-success-btn">×</button>

    <img
        src="/images/icones/tete.novameet.png"
        alt="Mascotte NovaMeet"
        class="mascotte mascotte-left"
    />
    <img
        src="/images/icones/tete.novameet.png"
        alt="Mascotte NovaMeet"
        class="mascotte mascotte-right"
    />

    <div class="icon-container">
        <img
            src="/images/icones/icon_valide.png"
            alt="Icône de succès"
            class="icon-success"
        />
    </div>
    
    <div class="popup_content-text">
        <h3 class="popup-title">${title}</h3>
        <p class="popup-message">
            ${message}
        </p>

        <div class="popup-actions">
            <a href="../index.html" class="btn btn-accueil">Accueil</a>
            <a href="./pages/profile.html" class="btn btn-profil">Profil</a>
        </div>
    </div>
</div>
`;