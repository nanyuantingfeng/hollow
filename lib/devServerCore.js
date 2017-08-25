'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startDevServer = startDevServer;

var _addDevServerEntrypoints = require('webpack-dev-server/lib/util/addDevServerEntrypoints');

var _addDevServerEntrypoints2 = _interopRequireDefault(_addDevServerEntrypoints);

var _plugins = require('./plugins');

var _createDomain = require('webpack-dev-server/lib/util/createDomain');

var _createDomain2 = _interopRequireDefault(_createDomain);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _PromiseDefer = require('./PromiseDefer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function colorInfo(msg) {
  return '\x1B[1m\x1B[34m' + msg + '\x1B[39m\x1B[22m';
} /**************************************************
   * Created by nanyuantingfeng on 23/08/2017 14:29.
   **************************************************/


function colorError(msg) {
  return '\x1B[1m\x1B[31m' + msg + '\x1B[39m\x1B[22m';
}

function startDevServer(context) {
  var webpackConfig = context.webpackConfig;


  var firstWpOpt = Array.isArray(webpackConfig) ? webpackConfig[0] : webpackConfig;

  var options = webpackConfig.devServer || firstWpOpt.devServer || {};

  if (!options.stats) {
    options.stats = {
      colors: true,
      cached: false,
      cachedAssets: false
    };
  }

  (0, _addDevServerEntrypoints2.default)(webpackConfig, options);

  var defer = (0, _PromiseDefer.PromiseDefer)();

  var compiler = void 0;

  try {
    compiler = (0, _plugins.webpack)(webpackConfig);
  } catch (e) {
    if (e instanceof _plugins.WebpackOptionsValidationError) {
      console.error(colorError(e.message));
      process.exit(1);
    }
    defer.reject(e);
  }

  var server = void 0;

  try {
    server = new _webpackDevServer2.default(compiler, options);
  } catch (e) {
    var OptionsValidationError = require('webpack-dev-server/lib/OptionsValidationError');
    if (e instanceof OptionsValidationError) {
      console.error(colorError(e.message));
      process.exit(1);
    }
    defer.reject(e);
  }

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      server.close();
      process.exit();
    });
  });

  server.listen(options.port, options.host, function (err) {
    if (err) throw err;
    defer.resolve(server);
    console.info('\nService is running at ' + colorInfo((0, _createDomain2.default)(options)));
  });

  return defer.promise;
}