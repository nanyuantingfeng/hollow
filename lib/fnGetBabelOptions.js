'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  return {
    cacheDirectory: (0, _os.tmpdir)(),

    presets: [[require.resolve('babel-preset-env'), { modules: false }], require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],

    plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-external-helpers'), require.resolve('babel-plugin-transform-runtime'), require.resolve('babel-plugin-transform-regenerator'), require.resolve('babel-plugin-transform-undefined-to-void'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-transform-regenerator')]
  };
};

var _os = require('os');

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:19.
 **************************************************/
module.exports = exports['default'];