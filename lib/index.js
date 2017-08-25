'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devServer = exports.build = void 0;

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

var _devServer = require('./devServer');

var _devServer2 = _interopRequireDefault(_devServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 11:25.
 **************************************************/

exports.build = _build2.default;
exports.devServer = _devServer2.default;