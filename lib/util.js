'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chalk = exports.notifier = void 0;

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 10:21.
 **************************************************/
exports.notifier = _nodeNotifier2.default;
exports.chalk = _chalk2.default;