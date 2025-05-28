<?php require_once('config/settings.php'); ?>
<?php
// Requête pour récupérer les events avec leur nom de catégorie
$sql1 = "SELECT events.*, events_categories.name AS category
        FROM events
        JOIN events_categories ON events.id_category = events_categories.id
        WHERE id_category=1
        ORDER BY date_start ASC";

$stmt1 = $pdo->query($sql1);
$eventscat1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- La recupere diretement la cat 1 -->

<?php
// Requête pour récupérer les events avec leur nom de catégorie
$sql = "SELECT events.*, events_categories.name AS category
        FROM events
        JOIN events_categories ON events.id_category = events_categories.id
        WHERE id_category= 3
        ORDER BY date_start ASC";

$stmt = $pdo->query($sql);
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Les pépites du coins</title>
  <meta name="description" content="Les pépites du coins" />
  <link rel="stylesheet" href="<?php echo css_dir; ?>theme.css?<?= time(); ?>" />
  <link rel="icon" type="image/x-icon" href="<?php echo img_dir; ?>/pepite-1.png" />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet" />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=account_circle" />
</head>

<body>
  <?php include('layout/header.php') ?>

  <main>
    <section class="filtre">
      <form action="GET" class="filtre_inputs">
        <div class="filtre_date">
          <input
            class="btn"
            type="date"
            id="start"
            name="trip-start"
            value="16-04-2025"
            min="01-01-2025"
            max="30-12-2030" />
        </div>
        <div class="filtre_ville">
          <input
            class="btn_filter input_ville"
            type="text"
            id="ville_input"
            placeholder="Tape une ville" />
          <button id="btn-recherche" class="btn btn_valide">V</button>
          <ul id="resultats"></ul>
        </div>
        <div class="filtre_tags">
          <input
            class="btn_filter jsbtn_tags"
            type="text"
            id="recherche"
            name="recherche"
            placeholder="Ajouter un tags" />
        </div>
      </form>
    </section>

    <section class="carosel">
      <h2 class="carosel_titre">Thème : Auto/Moto</h2>

      <div class="swiper">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-wrapper">
          <?php foreach ($eventscat1 as $event) { ?>
            <div class="swiper-slide">
              <article class="card-article">
                <div class="card-container">
                  <div class="card-img">
                    <img src="<?php echo img_dir; ?>events/small/<?php echo $event['image']; ?>" alt="<?php echo $event['title']; ?>">
                  </div>
                  <div class="card-text">
                    <h3><?php echo $event['title']; ?></h3>
                    <div class="card-category">
                      <span class="category-card"><?php echo $event['category']; ?></span>
                      <span class="like-card">❤️</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          <?php }
          ?>
        </div>
      </div>
    </section>


    <h2 class="carosel_titre">Thème : Fripe</h2>

    <div class="swiper">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-wrapper">
        <?php foreach ($events as $event) { ?>
          <div class="swiper-slide">
            <article class="card-article">
              <div class="card-container">
                <div class="card-img">
                  <img src="<?php echo img_dir; ?>events/small/<?php echo $event['image']; ?>" alt="<?php echo $event['title']; ?>">
                </div>
                <div class="card-text">
                  <h3><?php echo $event['title']; ?></h3>
                  <div class="card-category">
                    <span class="category-card"><?php echo $event['category']; ?></span>
                    <span class="like-card">❤️</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        <?php } ?>
      </div>
    </div>
    </section>
    </div>


    </div>
  </main>
  <?php include('layout/footer.php') ?>
  <script defer src="<?php echo js_dir ?>theme.js?<?= time(); ?>"></script>
</body>

</html>