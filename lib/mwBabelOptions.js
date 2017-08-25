'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _os = require('os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context.babelOptions = {
              cacheDirectory: (0, _os.tmpdir)(),
              presets: [[require.resolve('babel-preset-env'), { modules: false }], require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
              plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-external-helpers'), require.resolve('babel-plugin-transform-runtime'), require.resolve('babel-plugin-transform-regenerator'), require.resolve('babel-plugin-transform-undefined-to-void'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-transform-regenerator')]
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
}(); /**************************************************
      * Created by nanyuantingfeng on 16/08/2017 13:03.
      **************************************************/


module.exports = exports['default'];