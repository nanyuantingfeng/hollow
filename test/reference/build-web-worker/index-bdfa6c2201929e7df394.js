webpackJsonp([0],{

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _a = __webpack_require__("L3rp");

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var worker = new _a2.default();

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener('message', function (e) {
  console.log(e.data);
}, false);

console.log(1);

/***/ }),

/***/ "L3rp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return new Worker(__webpack_require__.p + "6d21a2fc79ba658dabdd.worker.js");
};

/***/ })

},["JkW7"]);