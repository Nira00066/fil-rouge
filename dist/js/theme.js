/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/action/event.js":
/*!****************************************!*\
  !*** ./assets/scripts/action/event.js ***!
  \****************************************/
/***/ (() => {

eval("function creatEvent() {\n  const page = document.getElementById(\"page\");\n  const page1 = document.getElementById(\"page1\");\n  const page2 = document.getElementById(\"page2\");\n  const eventAdd = document.getElementById(\"eventAdd\").addEventListener;\n  const eventSuivant = document.getElementById(\"eventSuivant\").addEventListener;\n  if (page) {\n  }\n}\n\n\n//# sourceURL=webpack://Afec_starter_kit/./assets/scripts/action/event.js?");

/***/ }),

/***/ "./assets/scripts/base.js":
/*!********************************!*\
  !*** ./assets/scripts/base.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Mainmenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Mainmenu */ \"./assets/scripts/components/Mainmenu.js\");\n/* harmony import */ var _action_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action/event */ \"./assets/scripts/action/event.js\");\n/* harmony import */ var _action_event__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_action_event__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack://Afec_starter_kit/./assets/scripts/base.js?");

/***/ }),

/***/ "./assets/scripts/components/Mainmenu.js":
/*!***********************************************!*\
  !*** ./assets/scripts/components/Mainmenu.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_mainMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/mainMenu.js */ \"./assets/scripts/data/mainMenu.js\");\n\nlet menu = `<ul>`;\n_data_mainMenu_js__WEBPACK_IMPORTED_MODULE_0__.mainMenu.forEach(function(item) {\n  menu += `<li><a href=\"${item.link}\">${item.name}</a></li>`;\n});\nmenu += `</ul>`;\ndocument.querySelector(\"#mainMenu\").innerHTML = menu;\n\n\n//# sourceURL=webpack://Afec_starter_kit/./assets/scripts/components/Mainmenu.js?");

/***/ }),

/***/ "./assets/scripts/data/mainMenu.js":
/*!*****************************************!*\
  !*** ./assets/scripts/data/mainMenu.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mainMenu: () => (/* binding */ mainMenu)\n/* harmony export */ });\nconst mainMenu = [\n  { name: \"Accueil\", link: \"index.html\" },\n  { name: \"Auto/Moto\", link: \"Auto/Moto.html\" },\n  { name: \"V\\xEAtements\", link: \"V\\xEAtements.html\" },\n  { name: \"March\\xE9\", link: \"March\\xE9.html\" }\n];\n\n\n//# sourceURL=webpack://Afec_starter_kit/./assets/scripts/data/mainMenu.js?");

/***/ }),

/***/ "./assets/styles/base.scss":
/*!*********************************!*\
  !*** ./assets/styles/base.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://Afec_starter_kit/./assets/styles/base.scss?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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