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

/***/ "./assets/scripts/api/config.js":
/*!**************************************!*\
  !*** ./assets/scripts/api/config.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_BASE_URL: () => (/* binding */ API_BASE_URL)\n/* harmony export */ });\nvar API_BASE_URL = \"http://localhost:3000\";\n\n//# sourceURL=webpack://fil/./assets/scripts/api/config.js?\n}");

/***/ }),

/***/ "./assets/scripts/api/userConnexion.js":
/*!*********************************************!*\
  !*** ./assets/scripts/api/userConnexion.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./assets/scripts/api/config.js\");\n/* harmony import */ var _components_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/popup.js */ \"./assets/scripts/components/popup.js\");\nfunction _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = \"function\" == typeof Symbol ? Symbol : {}, n = r.iterator || \"@@iterator\", o = r.toStringTag || \"@@toStringTag\"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, \"_invoke\", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError(\"Generator is already running\"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = \"next\"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError(\"iterator result is not an object\"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i[\"return\"]) && t.call(i), c < 2 && (u = TypeError(\"The iterator does not provide a '\" + o + \"' method\"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, \"GeneratorFunction\")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, \"constructor\", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction), GeneratorFunction.displayName = \"GeneratorFunction\", _regeneratorDefine2(GeneratorFunctionPrototype, o, \"GeneratorFunction\"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, \"Generator\"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, \"toString\", function () { return \"[object Generator]\"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }\nfunction _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, \"\", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o(\"next\", 0), o(\"throw\", 1), o(\"return\", 2)); }, _regeneratorDefine2(e, r, n, t); }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\n\nvar formConnexion = document.getElementById(\"form-connexion\");\nif (formConnexion) {\n  formConnexion.addEventListener(\"submit\", /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {\n      var data, response, _t;\n      return _regenerator().w(function (_context) {\n        while (1) switch (_context.p = _context.n) {\n          case 0:\n            e.preventDefault();\n            data = Object.fromEntries(new FormData(formConnexion).entries());\n            _context.p = 1;\n            _context.n = 2;\n            return fetch(\"\".concat(_config_js__WEBPACK_IMPORTED_MODULE_0__.API_BASE_URL, \"/api/connexion\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify(data)\n            });\n          case 2:\n            response = _context.v;\n            if (response.ok) {\n              _context.n = 3;\n              break;\n            }\n            throw new Error(\"Erreur HTTP: \".concat(response.status));\n          case 3:\n            console.log(\"✅ popup chargé :\", _components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup);\n            (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Connexion réussie 🎉\", \"success\");\n            setTimeout(function () {\n              window.location.href = \"../index.html\";\n            }, 2000);\n            _context.n = 5;\n            break;\n          case 4:\n            _context.p = 4;\n            _t = _context.v;\n            console.error(_t);\n            (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Erreur de connexion 😬\", \"error\");\n          case 5:\n            return _context.a(2);\n        }\n      }, _callee, null, [[1, 4]]);\n    }));\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n}\n\n//# sourceURL=webpack://fil/./assets/scripts/api/userConnexion.js?\n}");

/***/ }),

/***/ "./assets/scripts/api/usersInscription.js":
/*!************************************************!*\
  !*** ./assets/scripts/api/usersInscription.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./assets/scripts/api/config.js\");\n/* harmony import */ var _components_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/popup.js */ \"./assets/scripts/components/popup.js\");\nfunction _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = \"function\" == typeof Symbol ? Symbol : {}, n = r.iterator || \"@@iterator\", o = r.toStringTag || \"@@toStringTag\"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, \"_invoke\", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError(\"Generator is already running\"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = \"next\"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError(\"iterator result is not an object\"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i[\"return\"]) && t.call(i), c < 2 && (u = TypeError(\"The iterator does not provide a '\" + o + \"' method\"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, \"GeneratorFunction\")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, \"constructor\", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction), GeneratorFunction.displayName = \"GeneratorFunction\", _regeneratorDefine2(GeneratorFunctionPrototype, o, \"GeneratorFunction\"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, \"Generator\"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, \"toString\", function () { return \"[object Generator]\"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }\nfunction _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, \"\", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o(\"next\", 0), o(\"throw\", 1), o(\"return\", 2)); }, _regeneratorDefine2(e, r, n, t); }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\n\nvar formInscription = document.getElementById(\"form-inscription\");\nif (formInscription) {\n  formInscription.addEventListener(\"submit\", /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {\n      var data, response, _t;\n      return _regenerator().w(function (_context) {\n        while (1) switch (_context.p = _context.n) {\n          case 0:\n            e.preventDefault();\n            data = Object.fromEntries(new FormData(formInscription).entries());\n            if (!(data.password !== data.checkPassword)) {\n              _context.n = 1;\n              break;\n            }\n            (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Les mots de passe ne correspondent pas 😅\", \"error\");\n            return _context.a(2);\n          case 1:\n            _context.p = 1;\n            _context.n = 2;\n            return fetch(\"\".concat(_config_js__WEBPACK_IMPORTED_MODULE_0__.API_BASE_URL, \"/api/inscription\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify(data)\n            });\n          case 2:\n            response = _context.v;\n            if (response.ok) {\n              _context.n = 3;\n              break;\n            }\n            throw new Error(\"Erreur HTTP : \".concat(response.status));\n          case 3:\n            (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Compte créé avec succès 🎉\", \"success\");\n            console.log(\"✅ popup chargé :\", _components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup);\n            setTimeout(function () {\n              window.location.href = \"connexion.html\";\n              (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Compte créé avec succès 🎉\", \"success\");\n            }, 3500);\n            _context.n = 5;\n            break;\n          case 4:\n            _context.p = 4;\n            _t = _context.v;\n            console.error(_t);\n            (0,_components_popup_js__WEBPACK_IMPORTED_MODULE_1__.showPopup)(\"Erreur lors de la création du compte 😬\", \"error\");\n          case 5:\n            return _context.a(2);\n        }\n      }, _callee, null, [[1, 4]]);\n    }));\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n}\n\n//# sourceURL=webpack://fil/./assets/scripts/api/usersInscription.js?\n}");

/***/ }),

/***/ "./assets/scripts/base.js":
/*!********************************!*\
  !*** ./assets/scripts/base.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Mainmenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Mainmenu.js */ \"./assets/scripts/components/Mainmenu.js\");\n/* harmony import */ var _components_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/popup.js */ \"./assets/scripts/components/popup.js\");\n/* harmony import */ var _api_userConnexion_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/userConnexion.js */ \"./assets/scripts/api/userConnexion.js\");\n/* harmony import */ var _api_usersInscription_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/usersInscription.js */ \"./assets/scripts/api/usersInscription.js\");\n\n\n\n\n\n//# sourceURL=webpack://fil/./assets/scripts/base.js?\n}");

/***/ }),

/***/ "./assets/scripts/components/Mainmenu.js":
/*!***********************************************!*\
  !*** ./assets/scripts/components/Mainmenu.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_mainMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/mainMenu.js */ \"./assets/scripts/data/mainMenu.js\");\n\n// let mainMenuContainer = document.querySelector(\"#mainMenu\");\n\n// if (mainMenuContainer) {\n// let menu = `<ul>`;\n// mainMenu.forEach(function (item) {\n//   menu += `<li><a href=\"${item.link}\">${item.name}</a></li>`;\n// });\n\n// menu += `</ul>`;\n// if (mainMenuContainer)\n//   mainMenuContainer.innerHTML = menu;\n// } \n// Voila mon élement menu linké à mon fichier mainMenu.jsmlkjn  \n// <ul>\n// <li>\n//   <a href=\"index.html\"> Accueil </a>\n// </li>\n// <li>\n//   <a href=\"Auto/Moto.html\">Auto/Moto</a>\n// </li>\n// <li><a href=\"Vêtements.html\">Vêtements</a></li>\n// <li><a href=\"Marché.html\">Marché</a></li>\n// </ul>\n\n//# sourceURL=webpack://fil/./assets/scripts/components/Mainmenu.js?\n}");

/***/ }),

/***/ "./assets/scripts/components/popup.js":
/*!********************************************!*\
  !*** ./assets/scripts/components/popup.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showPopup: () => (/* binding */ showPopup)\n/* harmony export */ });\nfunction showPopup(message) {\n  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"info\";\n  var popup = document.createElement(\"div\");\n  popup.className = \"popup \".concat(type);\n  popup.textContent = message;\n  popup.style.position = \"fixed\";\n  popup.style.top = \"20px\";\n  popup.style.right = \"20px\";\n  popup.style.padding = \"12px 20px\";\n  popup.style.borderRadius = \"10px\";\n  popup.style.color = \"#fff\";\n  popup.style.fontWeight = \"bold\";\n  popup.style.zIndex = \"9999\";\n  popup.style.transition = \"opacity 0.5s ease\";\n  switch (type) {\n    case \"success\":\n      popup.style.background = \"#28a745\";\n      break;\n    case \"error\":\n      popup.style.background = \"#dc3545\";\n      break;\n    default:\n      popup.style.background = \"#007bff\";\n  }\n  document.body.appendChild(popup);\n  setTimeout(function () {\n    return popup.style.opacity = \"0\";\n  }, 2000);\n  setTimeout(function () {\n    return popup.remove();\n  }, 2500);\n}\n\n//# sourceURL=webpack://fil/./assets/scripts/components/popup.js?\n}");

/***/ }),

/***/ "./assets/scripts/data/mainMenu.js":
/*!*****************************************!*\
  !*** ./assets/scripts/data/mainMenu.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mainMenu: () => (/* binding */ mainMenu)\n/* harmony export */ });\nvar mainMenu = [{\n  name: \"Accueil\",\n  link: \"index.html\"\n}, {\n  name: \"Auto/Moto\",\n  link: \"Auto/Moto.html\"\n}, {\n  name: \"Vêtements\",\n  link: \"Vêtements.html\"\n}, {\n  name: \"Marché\",\n  link: \"Marché.html\"\n}];\n\n//# sourceURL=webpack://fil/./assets/scripts/data/mainMenu.js?\n}");

/***/ }),

/***/ "./assets/styles/base.scss":
/*!*********************************!*\
  !*** ./assets/styles/base.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fil/./assets/styles/base.scss?\n}");

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