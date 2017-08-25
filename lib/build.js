'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (args) {
  var context = (0, _extends3.default)({
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'production',
    cache: {}
  }, args);

  var cwd = context.cwd,
      config = context.config;


  return (0, _koaCompose2.default)((0, _mws.mwsBuild)(cwd, config))(context).then(_buildCore.startBuild);
};

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _mws = require('./mws');

var _buildCore = require('./buildCore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
module.exports = exports['default'];