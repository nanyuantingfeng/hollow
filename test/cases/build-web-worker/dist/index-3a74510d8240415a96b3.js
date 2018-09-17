(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "Fjye":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "a.worker-0543ab5eca9a09de1d0f.worker.js");
};

/***/ }),

/***/ "QfWi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _a_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Fjye");
/* harmony import */ var _a_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_a_worker__WEBPACK_IMPORTED_MODULE_0__);

var worker = new _a_worker__WEBPACK_IMPORTED_MODULE_0___default.a();
worker.postMessage({
  a: 1
});

worker.onmessage = function (event) {};

worker.addEventListener('message', function (e) {
  console.log(e.data);
}, false);
console.log(1);

/***/ })

},[["QfWi",1]]]);