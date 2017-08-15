'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    plugins: [(0, _rucksackCss2.default)(), (0, _autoprefixer2.default)({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    })]
  };
};

var _rucksackCss = require('rucksack-css');

var _rucksackCss2 = _interopRequireDefault(_rucksackCss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; /**************************************************
                                      * Created by nanyuantingfeng on 11/06/2017 08:49.
                                      **************************************************/