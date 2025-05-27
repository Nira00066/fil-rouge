<header class="header">
  <div class="container">
    <div class="header_top">
      <div class="header_logo">
        <a href="index.php">Les Pétpites Du Coins</a>
      </div>
      <div class="header_searchbar">
        <div class="header_searchbar_input">
          <input type="text" class="form-control" value="" name="bar_search" />
        </div>
        <div class="header_searchbar_btn">
          <button class="btn"> <a href="eventAdd.php">Créer un événement</a></button>
        </div>
      </div>
      <div class="header_profile">

        <a href="profil.php">
          <img src="<?php echo img_dir; ?>/profil.png" alt="" />
        </a>

      </div>
    </div>
    <div class="header_bottom">
      <nav>
        <ul>
          <li><a href="index.php">Accueil</a></li>
          <li><a href="Auto/Moto.php">Auto/Moto</a></li>
          <li><a href="Vêtements.php">Vêtements</a></li>
          <li><a href="Marché.php">Marché</a></li>
        </ul>
      </nav>
    </div>
    <div class="header__burger" onclick="openMenuMobile()">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg> -->
    </div>
  </div>

</header>