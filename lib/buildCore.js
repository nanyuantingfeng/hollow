'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.startBuild = startBuild;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _plugins = require('./plugins');

var _util = require('./util');

var _PromiseDefer = require('./PromiseDefer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startBuild(context) {
  var webpackConfig = context.webpackConfig;


  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];

  var fileOutputPath = void 0;

  webpackConfig.forEach(function (config) {
    fileOutputPath = config.output.path;
  });

  var defer = (0, _PromiseDefer.PromiseDefer)();

  function compileDoneHandler(err, stats) {
    if (context.json) {
      var filename = typeof context.json === 'boolean' ? 'build-bundle.json' : context.json;
      var jsonPath = _path2.default.join(fileOutputPath, filename);
      _fs2.default.writeFileSync(jsonPath, (0, _stringify2.default)(stats.toJson()), 'utf-8');
      console.log('Generate JSON File: ' + jsonPath);
    }

    var _stats$toJson = stats.toJson(),
        errors = _stats$toJson.errors;

    if (errors && errors.length) {
      process.on('exit', function () {
        process.exit(1);
      });
    }

    if (!context.watch || stats.hasErrors()) {

      var buildInfo = stats.toString({
        colors: true,
        children: true,
        chunks: !!context.verbose,
        modules: !!context.verbose,
        chunkModules: !!context.verbose,
        hash: !!context.verbose,
        version: !!context.verbose
      });

      if (stats.hasErrors()) {
        console.error(buildInfo);
      } else {
        console.log(buildInfo);
        _util.notifier.notify({
          title: 'hollow cli',
          message: 'done',
          subtitle: 'build successfully',
          contentImage: _path2.default.join(__dirname, '../assets/success.png'),
          sound: 'Glass'
        });
      }
    }

    if (err) {
      defer.reject(err);
      process.on('exit', function () {
        process.exit(1);
      });
    }

    defer.resolve();
  }

  var compiler = (0, _plugins.webpack)(webpackConfig);

  if (!context.verbose) {
    compiler.plugin('done', function (stats) {
      stats.stats.forEach(function (stat) {
        stat.compilation.children = stat.compilation.children.filter(function (child) {
          return child.name !== 'extract-text-webpack-plugin';
        });
      });
    });
  }

  if (context.watch) {
    compiler.watch(context.watch || 200, compileDoneHandler);
  } else {
    compiler.run(compileDoneHandler);
  }

  return defer.promise;
} /**************************************************
   * Created by nanyuantingfeng on 23/08/2017 17:29.
   **************************************************/