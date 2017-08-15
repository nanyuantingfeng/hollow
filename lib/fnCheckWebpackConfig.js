'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (webpackConfig) {
  var configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];
  var hasEmptyEntry = configs.some(function (c) {
    return (0, _keys2.default)(c.entry || {}).length === 0;
  });
  if (hasEmptyEntry) {
    var err = new Error('no webpack entry found');
    err.name = 'NoEntry';
    throw err;
  }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; /**************************************************
                                      * Created by nanyuantingfeng on 09/08/2017 16:59.
                                      **************************************************/