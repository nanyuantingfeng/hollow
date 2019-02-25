(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["index"],{

/***/ "./X.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__("../../../node_modules/tslib/tslib.es6.js");

var react_1 = tslib_1.__importDefault(__webpack_require__("../../../node_modules/react/index.js"));

var Greeter = function () {
  function Greeter(greeting) {
    this.greeting = greeting;
  }

  Greeter.prototype.greet = function () {
    return "<h1>" + this.greeting + "</h1>";
  };

  return Greeter;
}();

var greeter = new Greeter('Hello, world!');
var MMM = react_1.default.createElement("div", null, greeter.greet());

function Hello(_a) {
  var name = _a.name,
      _b = _a.enthusiasmLevel,
      enthusiasmLevel = _b === void 0 ? 1 : _b;

  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return react_1.default.createElement("div", {
    className: "hello"
  }, react_1.default.createElement("div", {
    className: "greeting"
  }, "Hello ", name + getExclamationMarks(enthusiasmLevel)));
}

exports.Hello = Hello;

function getExclamationMarks(numChars) {
  return Array(numChars + 1).join('!');
}

var LL = function (_super) {
  tslib_1.__extends(LL, _super);

  function LL() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LL.prototype.render = function () {
    return react_1.default.createElement("div", null);
  };

  return LL;
}(react_1.default.PureComponent);

exports.O = react_1.default.createElement(LL, {
  name: 'x'
});
exports.default = MMM;

/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__("../../../node_modules/tslib/tslib.es6.js");

var X_1 = tslib_1.__importStar(__webpack_require__("./X.tsx"));

exports.X = X_1.default;
exports.Hello = X_1.Hello;
exports.O = X_1.O;
exports.PropsXZ = X_1.PropsXZ;

/***/ })

},[["./index.ts","runtime~index",0]]]);