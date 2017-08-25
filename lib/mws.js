'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.mwsBuild = mwsBuild;
exports.mwsDevServer = mwsDevServer;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mwBuild = require('./mwBuild');

var _mwBuild2 = _interopRequireDefault(_mwBuild);

var _mwBabelOptions = require('./mwBabelOptions');

var _mwBabelOptions2 = _interopRequireDefault(_mwBabelOptions);

var _mwPostCSSOptions = require('./mwPostCSSOptions');

var _mwPostCSSOptions2 = _interopRequireDefault(_mwPostCSSOptions);

var _mwTSOptions = require('./mwTSOptions');

var _mwTSOptions2 = _interopRequireDefault(_mwTSOptions);

var _mwWebpackConfig = require('./mwWebpackConfig');

var _mwWebpackConfig2 = _interopRequireDefault(_mwWebpackConfig);

var _mwDevServer = require('./mwDevServer');

var _mwDevServer2 = _interopRequireDefault(_mwDevServer);

var _mwMultiEntryHTML = require('./mwMultiEntryHTML');

var _mwMultiEntryHTML2 = _interopRequireDefault(_mwMultiEntryHTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCustomConfig(path) {
  var _this = this;

  if (!_fs2.default.existsSync(path)) {
    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));
  }
  return require(path);
} /**************************************************
   * Created by nanyuantingfeng on 22/08/2017 21:57.
   **************************************************/


function getCustomConfigValue(cwd, config) {
  return getCustomConfig(_path2.default.join(cwd, config || 'webpack.config.js'));
}

function mwsBuild(cwd, config) {

  var mwConfig = getCustomConfigValue(cwd, config);

  return [_mwBuild2.default, _mwWebpackConfig2.default, _mwMultiEntryHTML2.default, _mwBabelOptions2.default, _mwPostCSSOptions2.default, _mwTSOptions2.default, mwConfig];
}

function mwsDevServer(cwd, config) {
  var mwConfig = getCustomConfigValue(cwd, config);

  return [_mwBuild2.default, _mwWebpackConfig2.default, _mwMultiEntryHTML2.default, _mwDevServer2.default, _mwBabelOptions2.default, _mwPostCSSOptions2.default, _mwTSOptions2.default, mwConfig];
}