'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _plugins = require('./plugins');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 24/08/2017 18:42.
 **************************************************/
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    var _extends2;

    var webpackConfig, packageMap, default_node_env, _webpackConfig$plugin, plugins, env, isDevENV, isBetaENV, version, versionTail;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next();

            webpackConfig = context.webpackConfig, packageMap = context.packageMap, default_node_env = context.default_node_env;
            _webpackConfig$plugin = webpackConfig.plugins, plugins = _webpackConfig$plugin === void 0 ? [] : _webpackConfig$plugin;

            /***********************
             * copy文件到输出目录
             */

            plugins.push(new _plugins.CopyWebpackPlugin((0, _util.fnBuildCopyFiles)(context.files)));

            /***********************
             * 配置忽略依赖
             */

            webpackConfig.externals = (0, _util.fnBuildExternals)(context.externals);

            env = process.env.NODE_ENV || default_node_env || 'development';
            isDevENV = env === 'development';
            isBetaENV = env === 'beta';
            version = context.version || packageMap.version || '0.0.0';
            versionTail = isBetaENV ? '-beta' : isDevENV ? '-dev' : '';


            plugins.push(new _plugins.DefinePlugin((0, _extends4.default)((_extends2 = {}, (0, _defineProperty3.default)(_extends2, 'process.env.NODE_ENV', (0, _stringify2.default)(env)), (0, _defineProperty3.default)(_extends2, 'VERSION', (0, _stringify2.default)(version)), (0, _defineProperty3.default)(_extends2, 'APPLICATION_VERSION', (0, _stringify2.default)('v' + version + versionTail)), _extends2), context.defines)));

            plugins.push(new _plugins.ProvidePlugin(context.provides));
            /***********************
             * 多入口配置
             */

            (0, _util.fnBuildHTML)(context, env).forEach(function (line) {
              plugins.push(new _plugins.HTMLWebpackPlugin(line));
            });

            webpackConfig.plugins = plugins;

          case 14:
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