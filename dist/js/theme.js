/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/action/event.js":
/*!****************************************!*\
  !*** ./assets/scripts/action/event.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar etapes = document.querySelectorAll(\"[data-id-form]\");\nvar btnSuivant = document.getElementById(\"eventSuivant\");\nvar btnValider = document.getElementById(\"eventAdd\");\nbtnSuivant.addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  //   empecher de faire une direction sur le lien   e.preventDefault();\n\n  var active = document.querySelector(\"[data-id-form].active\");\n  var currentIndex = Array.from(etapes).indexOf(active);\n  console.log(currentIndex);\n  if (currentIndex < etapes.length - 1) {\n    active.classList.remove(\"active\");\n    etapes[currentIndex + 1].classList.add(\"active\");\n  }\n  if (currentIndex + 1 === etapes.length - 1) {\n    // btnSuivant.classList.remove(\"btn\");\n    // btnSuivant.classList.add(\"btn_hidden\");\n    btnSuivant.classList.replace(\"btn\", \"btn_hidden\");\n    btnValider.classList.replace(\"btn_hidden\", \"btn\");\n\n    // btnValider.classList.add(\"btn_hidden\");\n    // btnValider.classList.remove(\"btn\");\n  }\n});\n\n//# sourceURL=webpack://fil/./assets/scripts/action/event.js?");

/***/ }),

/***/ "./assets/scripts/base.js":
/*!********************************!*\
  !*** ./assets/scripts/base.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Mainmenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Mainmenu.js */ \"./assets/scripts/components/Mainmenu.js\");\n/* harmony import */ var _action_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action/event.js */ \"./assets/scripts/action/event.js\");\n\n\n\n//# sourceURL=webpack://fil/./assets/scripts/base.js?");

/***/ }),

/***/ "./assets/scripts/components/Mainmenu.js":
/*!***********************************************!*\
  !*** ./assets/scripts/components/Mainmenu.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_mainMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/mainMenu.js */ \"./assets/scripts/data/mainMenu.js\");\n\nvar menu = \"<ul>\";\n_data_mainMenu_js__WEBPACK_IMPORTED_MODULE_0__.mainMenu.forEach(function (item) {\n  menu += \"<li><a href=\\\"\".concat(item.link, \"\\\">\").concat(item.name, \"</a></li>\");\n});\nmenu += \"</ul>\";\nvar mainMenuContainer = document.querySelector(\"#mainMenu\");\nif (mainMenuContainer) mainMenuContainer.innerHTML = menu;\n\n// Voila mon élement menu linké à mon fichier mainMenu.jsmlkjn  \n// <ul>\n// <li>\n//   <a href=\"index.html\"> Accueil </a>\n// </li>\n// <li>\n//   <a href=\"Auto/Moto.html\">Auto/Moto</a>\n// </li>\n// <li><a href=\"Vêtements.html\">Vêtements</a></li>\n// <li><a href=\"Marché.html\">Marché</a></li>\n// </ul>\n\n//# sourceURL=webpack://fil/./assets/scripts/components/Mainmenu.js?");

/***/ }),

/***/ "./assets/scripts/data/mainMenu.js":
/*!*****************************************!*\
  !*** ./assets/scripts/data/mainMenu.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mainMenu: () => (/* binding */ mainMenu)\n/* harmony export */ });\nvar mainMenu = [{\n  name: \"Accueil\",\n  link: \"index.html\"\n}, {\n  name: \"Auto/Moto\",\n  link: \"Auto/Moto.html\"\n}, {\n  name: \"Vêtements\",\n  link: \"Vêtements.html\"\n}, {\n  name: \"Marché\",\n  link: \"Marché.html\"\n}];\n\n//# sourceURL=webpack://fil/./assets/scripts/data/mainMenu.js?");

/***/ }),

/***/ "./assets/styles/base.scss":
/*!*********************************!*\
  !*** ./assets/styles/base.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fil/./assets/styles/base.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./assets/scripts/base.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/styles/base.scss");
/******/ 	
/******/ })()
;