'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _plugins = require('./plugins');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    var cwd, webpackConfig, cache, packageMap, _webpackConfig$plugin, plugins, outputPath, publicPath, compress, hash;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = context.cwd;


            context.packageMap = (0, _util.fnGetValueByPath)(_path2.default.join(cwd, 'package.json'));
            context.rules = [];

            next();

            webpackConfig = context.webpackConfig, cache = context.cache, packageMap = context.packageMap;
            _webpackConfig$plugin = webpackConfig.plugins, plugins = _webpackConfig$plugin === void 0 ? [] : _webpackConfig$plugin;


            webpackConfig.entry = context.entry || packageMap.entry;

            outputPath = context.outputPath, publicPath = context.publicPath, compress = context.compress, hash = context.hash;


            if (outputPath) {
              webpackConfig.output.path = _path2.default.join(cwd, outputPath);
            }

            if (publicPath) {
              webpackConfig.output.publicPath = publicPath;
            }

            if (compress === true) {
              plugins.push(new _plugins.UglifyJsPlugin({
                output: { ascii_only: true },
                compress: { warnings: false }
              }));
            }

            plugins.push.apply(plugins, [new _plugins.ProgressPlugin(_util.fnProgressHandler), new _plugins.NoEmitOnErrorsPlugin()]);

            if (hash) {
              webpackConfig.output.filename = '[name]-[chunkhash].js';
              webpackConfig.output.chunkFilename = '[name]-[chunkhash].js';
              plugins.push((0, _plugins.mapJSONWebpackPlugin)({ assetsPath: packageMap.name, cache: cache }));
            }

            webpackConfig.plugins = plugins;

            (0, _util.fnCheckWebpackConfig)(webpackConfig);

            return _context.abrupt('return', context);

          case 16:
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
      * Created by nanyuantingfeng on 16/08/2017 13:10.
      **************************************************/


module.exports = exports['default'];