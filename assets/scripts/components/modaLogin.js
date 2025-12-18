export const loginTemplate = `
  <section class="connexion">
    <div class="login-container">

      <div class="login-image">
        <img src="${window.location.pathname.includes('/pages/') ? '../' : './'}images/user/connexion-bg.jpg" 
             alt="Voiture vintage" />
      </div>

      <div class="login-form">
        <button class="close-btn" aria-label="Fermer">×</button>

        <h2>Connexion</h2>
        <p>Connecte-toi pour participer aux événements</p>

        <div id="login-error-display" class="validation-message" style="display:none;"></div>

        <form id="form-connexion">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" required />

          <label for="login-password">Mot de passe</label>
          <input type="password" id="login-password" required />

       

          <button type="submit" class="btn-submit">Connexion</button>
        </form>

        <p class="register-text">
          Pas encore de compte ?
          <a href="#" id="open-register">S’inscrire</a>
        </p>
      </div>
    </div>
  </section>
`;
