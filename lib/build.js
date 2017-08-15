'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getWebpackConfig = getWebpackConfig;

exports.default = function (args, callback) {

  var webpackConfig = getWebpackConfig(args, {});

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];

  var fileOutputPath = void 0;

  webpackConfig.forEach(function (config) {
    fileOutputPath = config.output.path;
  });

  webpackConfig.forEach(function (config) {
    config.plugins.push(new _webpackPlugins.ProgressPlugin(function (percentage, msg) {
      var stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write('\uD83D\uDCE6  ' + (_util.chalk.magenta(msg) + percentage * 100 + '%'));
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(_util.chalk.green('\nwebpack: bundle build is now finished.'));
      }
    }));
  });

  function doneHandler(err, stats) {
    if (args.json) {
      var filename = typeof args.json === 'boolean' ? 'build-bundle.json' : args.json;
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

    // if watch enabled only stats.hasErrors would log info
    // otherwise  would always log info
    if (!args.watch || stats.hasErrors()) {
      var buildInfo = stats.toString({
        colors: true,
        children: true,
        chunks: !!args.verbose,
        modules: !!args.verbose,
        chunkModules: !!args.verbose,
        hash: !!args.verbose,
        version: !!args.verbose
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
      process.on('exit', function () {
        process.exit(1);
      });
      console.error(err);
    }

    if (callback) {
      callback(err);
    }
  }

  // Run compiler.
  var compiler = (0, _webpackPlugins.webpack)(webpackConfig

  // Hack: remove extract-text-webpack-plugin log
  );if (!args.verbose) {
    compiler.plugin('done', function (stats) {
      stats.stats.forEach(function (stat) {
        stat.compilation.children = stat.compilation.children.filter(function (child) {
          return child.name !== 'extract-text-webpack-plugin';
        });
      });
    });
  }

  if (args.watch) {
    compiler.watch(args.watch || 200, doneHandler);
  } else {
    compiler.run(doneHandler);
  }
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpackPlugins = require('./webpackPlugins');

var _util = require('./util');

var _fnMergeCustomConfig = require('./fnMergeCustomConfig');

var _fnMergeCustomConfig2 = _interopRequireDefault(_fnMergeCustomConfig);

var _fnGetWebpackCommonConfig = require('./fnGetWebpackCommonConfig');

var _fnGetWebpackCommonConfig2 = _interopRequireDefault(_fnGetWebpackCommonConfig);

var _fnCheckWebpackConfig = require('./fnCheckWebpackConfig');

var _fnCheckWebpackConfig2 = _interopRequireDefault(_fnCheckWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWebpackConfig(args, cache) {
  var webpackConfig = (0, _fnGetWebpackCommonConfig2.default)(args);

  webpackConfig.plugins = webpackConfig.plugins || [];

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath;
  }

  if (args.publicPath) {
    webpackConfig.output.publicPath = args.publicPath;
  }

  // Watch mode should not use UglifyJsPlugin
  if (args.compress && !args.watch) {
    var UglifyJsPluginConfig = {
      output: {
        ascii_only: true
      },
      compress: {
        warnings: false
      }
    };
    webpackConfig.plugins = [].concat((0, _toConsumableArray3.default)(webpackConfig.plugins), [new _webpackPlugins.UglifyJsPlugin(UglifyJsPluginConfig), new _webpackPlugins.DefinePlugin({
      'process.env.NODE_ENV': (0, _stringify2.default)(process.env.NODE_ENV || 'production')
    })]);
  } else {
    webpackConfig.plugins = [].concat((0, _toConsumableArray3.default)(webpackConfig.plugins), [new _webpackPlugins.DefinePlugin({
      'process.env.NODE_ENV': (0, _stringify2.default)(process.env.NODE_ENV || 'development')
    })]);
  }

  webpackConfig.plugins = [].concat((0, _toConsumableArray3.default)(webpackConfig.plugins), [new _webpackPlugins.NoEmitOnErrorsPlugin()]);

  // Output map.json if hash.
  if (args.hash) {
    var pkg = require(_path2.default.join(args.cwd, 'package.json'));
    webpackConfig.output.filename = '[name]-[chunkhash].js';
    webpackConfig.output.chunkFilename = '[name]-[chunkhash].js';
    webpackConfig.plugins = [].concat((0, _toConsumableArray3.default)(webpackConfig.plugins), [(0, _webpackPlugins.mapJSONWebpackPlugin)({
      assetsPath: pkg.name,
      cache: cache
    })]);
  }

  if (typeof args.config === 'function') {
    webpackConfig = args.config(webpackConfig) || webpackConfig;
  } else {
    webpackConfig = (0, _fnMergeCustomConfig2.default)(webpackConfig, _path2.default.resolve(args.cwd, args.config || 'webpack.config.js'));
  }

  (0, _fnCheckWebpackConfig2.default)(webpackConfig);

  return webpackConfig;
} /**************************************************
   * Created by nanyuantingfeng on 11/06/2017 05:43.
   **************************************************/