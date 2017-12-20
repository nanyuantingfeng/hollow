webpackJsonp([0],{

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _a=__webpack_require__("L3rp"),_a2=_interopRequireDefault(_a);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var worker=new _a2.default;worker.postMessage({a:1}),worker.onmessage=function(){},worker.addEventListener('message',function(a){console.log(a.data)},!1),console.log(1);

/***/ }),

/***/ "L3rp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports=function(){return new Worker(__webpack_require__.p+"90b992ac17b4ae412a3d.worker.js")};

/***/ })

},["JkW7"]);