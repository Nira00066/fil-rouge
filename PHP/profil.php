<?php require_once('config/settings.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="<?php echo css_dir ?>theme.css?<?=time();?>" />
  <script defer src="<?php echo js_dir ?>theme.js?<?=time();?>"></script>

  <title>Page Profile</title>
</head>

<body>
  <?php include('layout/headerProfil.php') ?>
  <section class="headerProfil_contenair">
    <div class="headerProfil_liens">
      <div class="headerProfil_nameUser jsnameUser">
        <h1><strong>Utilisateur 9999 </strong></h1>
      </div>
      <div><a href="contact.php">Contact</a></div>
      <div><a href="apropos.php">A propos</a></div>
    </div>
    <div class="headerProfil_btns">
      <button class="btn_connexion" id='popupCojs'>Connexion</button>
      <button class="btn_connexion" id='popupInsjs'>Inscription</button>
    </div>
  </section>

  <!-- <?php include('layout/pop_co.php') ?> -->
</body>

</html>