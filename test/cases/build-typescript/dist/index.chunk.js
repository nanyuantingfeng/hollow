(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var react_1 = tslib_1.__importDefault(__webpack_require__(2));
function ddd(Component) {
    return (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return react_1.default.createElement(Component, null);
        };
        return class_1;
    }(react_1.default.Component));
}
var Y = (function (_super) {
    tslib_1.__extends(Y, _super);
    function Y() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Y.prototype.render = function () {
        return react_1.default.createElement("div", null);
    };
    Y = tslib_1.__decorate([
        ddd
    ], Y);
    return Y;
}(react_1.default.Component));
exports.default = Y;
function demo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.concat([9990000, 21]);
}
exports.demo = demo;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var X_1 = tslib_1.__importStar(__webpack_require__(4));
exports.X = X_1.default;
exports.Hello = X_1.Hello;
exports.O = X_1.O;
exports.Props = X_1.Props;
var entry_1 = tslib_1.__importDefault(__webpack_require__(7));
exports.ddd = entry_1.default;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var react_1 = tslib_1.__importDefault(__webpack_require__(2));
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    return Greeter;
}());
var greeter = new Greeter('Hello, world!');
var MMM = (react_1.default.createElement("div", null, greeter.greet()));
function Hello(_a) {
    var name = _a.name, _b = _a.enthusiasmLevel, enthusiasmLevel = _b === void 0 ? 1 : _b;
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }
    return (react_1.default.createElement("div", { className: "hello" },
        react_1.default.createElement("div", { className: "greeting" },
            "Hello ",
            name + getExclamationMarks(enthusiasmLevel))));
}
exports.Hello = Hello;
function getExclamationMarks(numChars) {
    return Array(numChars + 1).join('!');
}
var LL = (function (_super) {
    tslib_1.__extends(LL, _super);
    function LL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LL.prototype.render = function () {
        return (react_1.default.createElement("div", null));
    };
    return LL;
}(react_1.default.PureComponent));
exports.O = (react_1.default.createElement(LL, { name: "x" }));
exports.default = MMM;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Y__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Y__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Y__WEBPACK_IMPORTED_MODULE_0__);
/**************************************************
 * Created by nanyuantingfeng on 2018/9/6 10:38.
 **************************************************/

/* harmony default export */ __webpack_exports__["default"] = ([_Y__WEBPACK_IMPORTED_MODULE_0___default.a, _Y__WEBPACK_IMPORTED_MODULE_0__["demo"]]);

/***/ })
],[[3,1,2]]]);