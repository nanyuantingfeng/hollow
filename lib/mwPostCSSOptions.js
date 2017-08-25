'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _rucksackCss = require('rucksack-css');

var _rucksackCss2 = _interopRequireDefault(_rucksackCss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:55.
 **************************************************/
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            context.postcssOptions = {
              sourceMap: true,
              plugins: [(0, _rucksackCss2.default)(), (0, _autoprefixer2.default)({
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
              })]
            };

            next();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];