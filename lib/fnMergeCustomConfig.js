'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function (webpackConfig, customConfigPath) {
  if (!(0, _fs.existsSync)(customConfigPath)) {
    return webpackConfig;
  }

  var customConfig = require(customConfigPath);

  if (typeof customConfig === 'function') {
    return customConfig.apply(void 0, [webpackConfig].concat((0, _toConsumableArray3.default)([].concat(Array.prototype.slice.call(arguments)).slice(2))));
  }

  throw new Error('Return of ' + customConfigPath + ' must be a function.');
};

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:44.
 **************************************************/
module.exports = exports['default'];