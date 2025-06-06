<?php require_once('config/settings.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Crée un événement</title>
  <meta name="description" content="Les pépites du coins" />
  <link rel="stylesheet" href="<?php echo css_dir; ?>theme.css?<?= time(); ?>" />
  <script defer src="<?php echo js_dir; ?>theme.js?<?= time(); ?>"></script>
  <link rel="icon" type="image/x-icon" href="assets/pepite-1.png" />
</head>

<body>
  <?php include('layout/headerEvent.php') ?>
  <!-- Header -->

  <main class="container_eventAdd">
    <div class="eventAdd_titrePrincipal">
      <h1><strong>Créer un événement </strong></h1>
    </div>

    <!-- Titre Formulaire  -->

    <form
      action="eventAdd.js"
      method="POST"
      enctype="multipart/form-data"
      class="eventAdd_form">
      <!-- Partie 1 visible  -->
      <div class="container_page active" data-id-form="3" id="page">
        <div class="box container_box">
          <label for="photo">Photo Principal</label>
          <div class="filewrapper">
            <div class="btn_photo">Importer vos photos</div>
            <input type="file" id="photo" name="photo" />
          </div>
          <!-- Il y aura le trais avac le sccs que j'ai deja fait dans le duo -->
          <button class="btn_form">Enregistrer depuis l'URL</button>
        </div>
        <div class="box container_box">
          <label for="titre">Titre de l'événement:</label>
          <input class="btn" type="text" id="titre" name="titre" />
          <!-- Partie Dates -->
          <div class="box container_box2">
            <div class="box container_box">
              <label for="date">Date:</label>
              <input class="btn" type="date" id="date" name="date" />
            </div>
            <div class="box container_box">
              <label for="date">Date:</label>
              <input class="btn" type="date" id="date" name="date" />
            </div>
            <div class="box container_btn">
              <button class="btn_addDate">+</button>
            </div>
          </div>
          <!-- partie heures -->
          <!-- ! Je sais pas comment le mettre le texte au centre des inputs -->
          <!-- ? Changer le parametre de eventadd_date car corresopnt pas  -->
          <div class="box container_box2">
            <div class="box container_box">
              <label for="time">Heure:</label>
              <input class="btn" type="time" id="time" name="time" />
            </div>
            <div class="box container_box">
              <label for="time">Heure de fin</label>
              <input class="btn" type="time" id="time" name="time" />
            </div>
          </div>
          <div class="box container_box">
            <label for="location">Lieu:</label>
            <input class="btn" type="text" id="location" name="location" />
          </div>
          <!-- Category , tag ,program , lien du poste sur les autre platformes  -->
        </div>
      </div>

      <!-- Partie 2  -->
      <div class="container_page" data-id-form="2" id="page1">
        <div class="box container_box">
          <label for="photo">Photos</label>
          <div class="filewrapper">
            <div class="btn_photo">Importer vos photos</div>
            <input type="file" id="photo" name="photo" />
          </div>
          <!-- Il y aura le trais avac le sccs que j'ai deja fait dans le duo -->
          <button class="btn_form">Enregistrer depuis l'URL</button>
        </div>
        <div class="container_box">
          <div class="box container_box">
            <label for="description">Description:</label>
            <textarea
              class="btn"
              id="description"
              name="description"></textarea>
          </div>
          <div class="box container_box">
            <label for="description">Programme</label>
            <textarea
              class="btn"
              id="description"
              name="description"></textarea>
          </div>

          <div class="box container_box">
            <label for="description">Tags:</label>
            <input class="btn" type="text" id="tag" name="tag" />
          </div>
        </div>
      </div>
      <!-- Partie 3and last -->
      <div class="container_page" data-id-form="3" id="page2">
        <div class="container_box">
          <div class="box container_box">
            <label for="description">Catégorie</label>
            <input class="btn" type="text" id="category" name="category" />
          </div>

          <div class="box container_box">
            <label for="description">Lien du poste sur les autres plateformes:</label>
            <input class="btn" type="text" id="link" name="link" />
          </div>
        </div>
      </div>
      <!-- ! A voir si je mets les immages charger  -->
      <!-- ? est-ce que on fait un prewiews?  -->
      <!-- Fin  -->
      <div>
        <input
          class="btn_hidden"
          type="submit"
          value="Créer l'événement"
          id="eventAdd" />
        <button id="eventSuivant" class="btn" src="index.php">
          Suivant
        </button>
      </div>
    </form>
  </main>
</body>
</html>