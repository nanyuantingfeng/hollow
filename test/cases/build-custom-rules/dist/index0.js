webpackJsonp([0],{

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _demo = __webpack_require__("ksy6");

var _demo2 = _interopRequireDefault(_demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(_demo2.default, null)
));

/***/ }),

/***/ "ksy6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("anaa");

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__("SAdv");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

exports.default = function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return _react2.default.createElement(
    "svg",
    (0, _extends3.default)({ width: "22", height: "22", viewBox: "0 0 22 22", xmlns: "http://www.w3.org/2000/svg" }, props),
    _react2.default.createElement(
      "title",
      null,
      "ellipsis"
    ),
    _react2.default.createElement(
      "g",
      { fill: "currentColor", fillRule: "evenodd" },
      _react2.default.createElement("circle", { cx: "2", cy: "11", r: "1" }),
      _react2.default.createElement("circle", { cx: "20", cy: "11", r: "1" }),
      _react2.default.createElement("circle", { cx: "11", cy: "11", r: "1" })
    )
  );
};

module.exports = exports["default"];

/***/ })

},["JkW7"]);