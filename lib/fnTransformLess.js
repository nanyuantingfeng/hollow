'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (lessFile) {
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _config$cwd = config.cwd,
      cwd = _config$cwd === void 0 ? process.cwd() : _config$cwd;

  var resolvedLessFile = _path2.default.resolve(cwd, lessFile);

  var data = (0, _fs.readFileSync)(resolvedLessFile, 'utf-8');

  data = data.replace(/^\uFEFF/, '');

  return new _promise2.default(function (resolve, reject) {
    // Do less compile
    var lessOpts = {
      paths: [(0, _path.dirname)(resolvedLessFile)],
      filename: resolvedLessFile,
      plugins: [new _lessPluginNpmImport2.default({ prefix: '~' })]
    };

    _less2.default.render(data, lessOpts).then(function (result) {
      // Do postcss compile
      var plugins = [(0, _rucksackCss2.default)(), (0, _autoprefixer2.default)({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
      })];
      var source = result.css;
      var postcssOpts = {};

      (0, _postcss2.default)(plugins).process(source, postcssOpts).then(function (r) {
        resolve(r.css);
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _rucksackCss = require('rucksack-css');

var _rucksackCss2 = _interopRequireDefault(_rucksackCss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _lessPluginNpmImport = require('less-plugin-npm-import');

var _lessPluginNpmImport2 = _interopRequireDefault(_lessPluginNpmImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
module.exports = exports['default'];