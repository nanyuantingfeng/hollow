webpackJsonp([0],{

/***/ "QOAB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("b1DC");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__("d/v/");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("6AD2");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("+oaX");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__("VMif");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _temp;

__webpack_require__("tpyr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parent = function Parent() {
  (0, _classCallCheck3.default)(this, Parent);

  console.log('Parent constructor');
  this.name = 'john';
};

var A = (_temp = _class = function (_Parent) {
  (0, _inherits3.default)(A, _Parent);

  function A() {
    (0, _classCallCheck3.default)(this, A);

    console.log('Child constructor');
    return (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).call(this));
  }

  (0, _createClass3.default)(A, [{
    key: 'foo',
    value: function foo() {
      console.log('foo', this.name);
    }
  }], [{
    key: 'method',
    value: function method(obj) {
      console.log('method', obj);
    }
  }]);
  return A;
}(Parent), _class.propTypes = 1, _temp);


var a = new A();
a.foo();
A.method('haha');

/***/ }),

/***/ "tpyr":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1.html";

/***/ })

},["QOAB"]);