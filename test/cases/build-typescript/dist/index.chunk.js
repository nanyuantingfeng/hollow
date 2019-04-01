(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["index"],{

/***/ "./index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/nanyuantingfeng/Repositories/github/hollow-cli/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("../../../node_modules/tslib/tslib.es6.js");

// EXTERNAL MODULE: /Users/nanyuantingfeng/Repositories/github/hollow-cli/node_modules/react/index.js
var react = __webpack_require__("../../../node_modules/react/index.js");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// CONCATENATED MODULE: ./X.tsx


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
var MMM = react_default.a.createElement("div", null, greeter.greet());
function Hello(_a) {
    var name = _a.name, _b = _a.enthusiasmLevel, enthusiasmLevel = _b === void 0 ? 1 : _b;
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }
    return (react_default.a.createElement("div", { className: "hello" },
        react_default.a.createElement("div", { className: "greeting" },
            "Hello ",
            name + getExclamationMarks(enthusiasmLevel))));
}
function getExclamationMarks(numChars) {
    return Array(numChars + 1).join('!');
}
var X_LL = (function (_super) {
    tslib_es6["a" /* __extends */](LL, _super);
    function LL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LL.prototype.render = function () {
        return react_default.a.createElement("div", null);
    };
    return LL;
}(react_default.a.PureComponent));
var O = react_default.a.createElement(X_LL, { name: 'x' });
/* harmony default export */ var X = (MMM);

// CONCATENATED MODULE: ./index.ts
/* concated harmony reexport X */__webpack_require__.d(__webpack_exports__, "X", function() { return X; });
/* concated harmony reexport Hello */__webpack_require__.d(__webpack_exports__, "Hello", function() { return Hello; });
/* concated harmony reexport O */__webpack_require__.d(__webpack_exports__, "O", function() { return O; });





/***/ })

},[["./index.ts","runtime~index",0]]]);