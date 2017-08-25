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
    default_node_env: 'development',
    cache: {}
  }, args);

  var cwd = context.cwd,
      config = context.config;


  return (0, _koaCompose2.default)((0, _mws.mwsDevServer)(cwd, config))(context).then(_devServerCore.startDevServer);
};

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _mws = require('./mws');

var _devServerCore = require('./devServerCore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
module.exports = exports['default'];