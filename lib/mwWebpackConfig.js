'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _plugins = require('./plugins');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:01.
 **************************************************/
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    var cwd, hash, devtool, limit, default_node_env, packageMap, env, jsFileName, cssFileName, commonName, theme, node, babelOptions, postcssOptions, tsOptions, rules;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = context.cwd, hash = context.hash, devtool = context.devtool, limit = context.limit, default_node_env = context.default_node_env, packageMap = context.packageMap;
            env = process.env.NODE_ENV || default_node_env || 'development';
            jsFileName = hash ? '[name]-[chunkhash].js' : '[name].js';
            cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css';
            commonName = hash ? 'common-[chunkhash].js' : 'common.js';


            limit = limit || 10000;

            theme = getTheme(packageMap, cwd);
            node = getNode(packageMap);


            context.webpackConfig = {
              cache: true,
              devtool: devtool,
              node: node,
              context: context.context || cwd,
              output: {
                path: _path2.default.join(cwd, './dist/'),
                filename: jsFileName,
                chunkFilename: jsFileName
              },
              resolve: {
                modules: ['node_modules', _path2.default.join(__dirname, '../node_modules')],
                extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.lazy.js', '.js', '.jsx', '.json']
              }
            };

            context.webpackConfig.plugins = [new _plugins.CommonsChunkPlugin({
              name: 'common',
              filename: commonName,
              minChunks: 3
            }), new _plugins.CaseSensitivePathsPlugin(), new _plugins.FriendlyErrorsWebpackPlugin({
              onErrors: function onErrors(severity, errors) {
                if (severity !== 'error') {
                  _util.notifier.notify({
                    title: 'hollow cli',
                    message: 'warn',
                    contentImage: _path2.default.join(__dirname, '../assets/warn.png'),
                    sound: 'Glass'
                  });
                  return;
                }
                var error = errors[0];
                _util.notifier.notify({
                  title: 'hollow cli',
                  message: severity + ' : ' + error.name,
                  subtitle: error.file || '',
                  contentImage: _path2.default.join(__dirname, '../assets/fail.png'),
                  sound: 'Glass'
                });
              }
            })];

            if (env === 'production') {
              context.webpackConfig.plugins.push(new _plugins.ExtractTextPlugin({
                filename: cssFileName,
                disable: false,
                allChunks: true
              }));
            }

            next();

            babelOptions = context.babelOptions, postcssOptions = context.postcssOptions, tsOptions = context.tsOptions, rules = context.rules;


            context.webpackConfig.module = {
              noParse: [/moment.js/],
              rules: [{
                test: function test(filePath) {
                  return (/\.lazy\.jsx?$/.test(filePath)
                  );
                },

                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelOptions }, { loader: 'bundle-loader', options: { lazy: true } }]
              }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelOptions }]
              }, {
                test: /\.jsx$/,
                use: [{ loader: 'babel-loader', options: babelOptions }]
              }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelOptions }, { loader: 'ts-loader', options: tsOptions }]
              }, {
                test: function test(filePath) {
                  return (/\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
                  );
                },

                use: fixStyleLoaders4Production([{
                  loader: 'css-loader', options: {
                    sourceMap: true,
                    '-autoprefixer': true,
                    '-restructuring': true
                  }
                }, { loader: 'postcss-loader', options: postcssOptions }], env)
              }, {
                test: /\.module\.css$/,
                use: fixStyleLoaders4Production([{
                  loader: 'css-loader', options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[local]___[hash:base64:5]',
                    '-autoprefixer': true,
                    '-restructuring': true
                  }
                }, { loader: 'postcss-loader', options: postcssOptions }], env)
              }, {
                test: function test(filePath) {
                  return (/\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
                  );
                },

                use: fixStyleLoaders4Production([{
                  loader: 'css-loader', options: {
                    sourceMap: true,
                    '-autoprefixer': true
                  }
                }, { loader: 'postcss-loader', options: postcssOptions }, { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } }], env)
              }, {
                test: /\.module\.less$/,
                use: fixStyleLoaders4Production([{
                  loader: 'css-loader', options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[local]___[hash:base64:5]',
                    '-autoprefixer': true
                  }
                }, { loader: 'postcss-loader', options: postcssOptions }, { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } }], env)
              }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: limit, minetype: 'application/font-woff' } }]
              }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: limit, minetype: 'application/font-woff' } }]
              }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: limit, minetype: 'application/octet-stream' } }]
              }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: limit, minetype: 'application/vnd.ms-fontobject' } }]
              }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: limit, minetype: 'image/svg+xml' } }]
              }, {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [{ loader: 'url-loader', options: { limit: limit } }]
              }, {
                test: /\.html?$/,
                use: [{
                  loader: 'file-loader', options: {
                    name: '[path][name].[ext]'
                  }
                }]
              }, {
                test: /\.hbs?$/, use: [{ loader: 'mustache-loader' }]
              }].concat((0, _toConsumableArray3.default)(rules))
            };

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function fixStyleLoaders4Production(rules, env) {
  var styleLoader = 'style-loader';
  if (env === 'production') {
    return _plugins.ExtractTextPlugin.extract({ fallback: styleLoader, use: rules });
  }
  return [{ loader: styleLoader }].concat((0, _toConsumableArray3.default)(rules));
}

function getNode(packageMap) {

  var emptyBuildIns = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls'];

  var browser = packageMap.browser || {};

  return emptyBuildIns.reduce(function (obj, name) {
    if (!(name in browser)) {
      return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, name, 'empty'));
    }
    return obj;
  }, {});
}

function getTheme(packageMap, cwd) {
  var theme = {};

  if (packageMap.theme && typeof packageMap.theme === 'string') {

    var pp = packageMap.theme;
    if (pp.charAt(0) === '.') {
      pp = _path2.default.resolve(cwd, pp);
    }

    var getThemeConfig = require(pp);
    theme = getThemeConfig();
  } else if (packageMap.theme && (0, _typeof3.default)(packageMap.theme) === 'object') {
    theme = packageMap.theme;
  }

  return theme;
}
module.exports = exports['default'];