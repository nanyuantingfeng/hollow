"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.PromiseDefer = PromiseDefer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 16:24.
 **************************************************/
function PromiseDefer() {
  var resolve = void 0;
  var reject = void 0;
  var promise = new _promise2.default(function (rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return { promise: promise, resolve: resolve, reject: reject };
}