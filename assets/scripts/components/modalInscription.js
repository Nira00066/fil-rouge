export const registerTemplate = `
<section class="inscription">
  <div class="inscription-container">
    <div class="inscription-image">
      <img src="${window.location.pathname.includes("/pages/") ? "../" : "./"}images/backroung/inscription-bg.jpg" alt="Voiture rétro" />
    </div>
    <div class="inscription-form">
      <button class="close-btn" aria-label="Fermer">×</button>
      <h2>Inscription</h2>
      <p>Rejoins la communauté auto</p>

      <div id="inscription-error-display" class="validation-message" style="display: none;"></div>

      <form id="form-inscription" >
        <div class="form-row">
          <div class="form-col">
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom" required />
          </div>
          <div class="form-col">
            <label for="nom">Nom</label>
            <input type="text" id="nom" required />
          </div>
        </div>

        <label for="register-email">Email</label>
        <input type="email" id="register-email" required />

        <label for="register-password">Mot de passe</label>
        <input type="password" id="register-password" required />

        <label for="checkPassword">Confirmer</label>
        <input type="password" id="checkPassword" required />

        <button type="submit" id="btn_inscription" class="btn-submit">Créer mon compte</button>
      </form>

      <p class="register-text">
        Déjà un compte ?
        <a href="#" id="open-login">Se connecter</a>
      </p>
    </div>
  </div>
</section>
`;
