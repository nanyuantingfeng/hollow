(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["index"],{

/***/ "./X.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return O; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




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
var MMM = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, greeter.greet());
function Hello(_a) {
  var name = _a.name,
      _b = _a.enthusiasmLevel,
      enthusiasmLevel = _b === void 0 ? 1 : _b;

  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "hello"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "greeting"
  }, "Hello ", name + getExclamationMarks(enthusiasmLevel)));
}

function getExclamationMarks(numChars) {
  return Array(numChars + 1).join('!');
}

var LL = function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"](LL, _super);

  function LL() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LL.prototype.render = function () {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null);
  };

  return LL;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

var O = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LL, {
  name: 'x'
});
var _default = MMM;
/* harmony default export */ __webpack_exports__["c"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Greeter, "Greeter", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(greeter, "greeter", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(MMM, "MMM", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(Hello, "Hello", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(getExclamationMarks, "getExclamationMarks", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(LL, "LL", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(O, "O", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
  reactHotLoader.register(_default, "default", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/X.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./Y.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demo.ts", function() { return demo; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function ddd(Component) {
  return function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"](class_1, _super);

    function class_1() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    class_1.prototype.render = function () {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, null);
    };

    return class_1;
  }(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);
}

var Y = function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"](Y, _super);

  function Y() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Y.prototype.render = function () {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null);
  };

  Y = tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"]([ddd], Y);
  return Y;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

var _default = Y;
/* harmony default export */ __webpack_exports__["default"] = (_default);
function demo() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return args.concat([9990000, 21]);
}
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ddd, "ddd", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/Y.tsx");
  reactHotLoader.register(Y, "Y", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/Y.tsx");
  reactHotLoader.register(demo, "demo.ts", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/Y.tsx");
  reactHotLoader.register(_default, "default", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/Y.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js");
/* harmony import */ var _babel_runtime_helpers_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _X__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./X.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "X", function() { return _X__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hello", function() { return _X__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "O", function() { return _X__WEBPACK_IMPORTED_MODULE_1__["b"]; });



(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





function ZZZ() {
  return Promise.resolve().then(function () {
    return _babel_runtime_helpers_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0___default()(__webpack_require__("./Y.tsx"));
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ZZZ, "ZZZ", "/Users/nanyuantingfeng/Repositories/github/hollow-cli/test/cases/build-typescript/index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__("../../../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

},[["./index.ts","runtime~index",0]]]);
