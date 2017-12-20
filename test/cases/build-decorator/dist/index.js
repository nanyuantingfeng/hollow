webpackJsonp([0],{

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__("VMif");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calls = [];

function dec(id) {
  calls.push(id);
  return function () {};
}

var Example = (_dec = dec(1), _dec(_class = function Example() {
  (0, _classCallCheck3.default)(this, Example);
}) || _class);

/***/ }),

/***/ "VMif":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ })

},["JkW7"]);