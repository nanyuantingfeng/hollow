webpackJsonp([0],{

/***/ "gp7H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__("VMif");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("d/v/");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Greeter = function () {
    function Greeter(greeting) {
        (0, _classCallCheck3.default)(this, Greeter);

        this.greeting = greeting;
    }

    (0, _createClass3.default)(Greeter, [{
        key: 'greet',
        value: function greet() {
            return '<h1>' + this.greeting + '</h1>';
        }
    }]);
    return Greeter;
}();

var greeter = new Greeter('Hello, world!');
document.body.innerHTML = React.createElement(
    'div',
    null,
    greeter.greet()
);

/***/ })

},["gp7H"]);