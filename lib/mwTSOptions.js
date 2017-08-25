'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            context.typescriptOptions = context.tsOptions = {
              transpileOnly: true,
              compilerOptions: {
                target: 'es2016',
                module: 'es2015',
                jsx: 'preserve',
                moduleResolution: 'node',
                declaration: false,
                sourceMap: false,

                allowSyntheticDefaultImports: true,
                lib: ['dom', 'es2015', 'es2016'],
                noImplicitAny: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                removeComments: false,
                preserveConstEnums: true,
                skipLibCheck: true
              }
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