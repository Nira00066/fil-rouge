<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/dist/css/theme.css" />
    <title>Page Profile</title>
  </head>
  <body>
    <header class="headerProfil">
      <div class="headerProfil_icon">
        <div><img src="" alt="" /></div>
        <div><img src="" alt="" /></div>
      </div>
      <div class="headerProfil_logo">
        <a href="index.php"
          ><img
            src="images/logo-title.png"
            alt="text qui est Les pépites du coins"
        /></a>
      </div>
      <div class="headerProfil_img">
        <img src="images/profil.png" alt="logo-profil" class="" />
      </div>
    </header>
    <section class="headerProfil_contenair">
      <div class="headerProfil_liens">
        <div class="headerProfil_nameUser jsnameUser">
          <h1><strong>Utilisateur 9999 </strong></h1>
        </div>
        <div><a href="contact.html">Contact</a></div>
        <div><a href="apropos.html">A propos</a></div>
      </div>
      <div class="headerProfil_btns">
        <button class="btn_connexion" id='popupCojs' >Connexion</button>
        <button class="btn_connexion" id='popupInsjs'>Inscription</button>
      </div>
    </section>
    <div class="overlay"></div>
   <?php include('layout/pop_co.php') ?>
  </body>
</html>
