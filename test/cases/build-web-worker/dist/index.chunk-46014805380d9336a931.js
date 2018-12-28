(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "a.worker-07dc29a6a1b9a1284715.worker.js");
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _a_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
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
],[[1,1]]]);