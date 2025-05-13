import { mainMenu } from "../data/mainMenu.js";

let menu = `<ul>`;
mainMenu.forEach(function (item) {
  menu += `<li><a href="${item.link}">${item.name}</a></li>`;
});

menu += `</ul>`;
let mainMenuContainer = document.querySelector("#mainMenu");
if (mainMenuContainer)
  mainMenuContainer.innerHTML = menu;

// Voila mon élement menu linké à mon fichier mainMenu.jsmlkjn  
// <ul>
// <li>
//   <a href="index.html"> Accueil </a>
// </li>
// <li>
//   <a href="Auto/Moto.html">Auto/Moto</a>
// </li>
// <li><a href="Vêtements.html">Vêtements</a></li>
// <li><a href="Marché.html">Marché</a></li>
// </ul>
