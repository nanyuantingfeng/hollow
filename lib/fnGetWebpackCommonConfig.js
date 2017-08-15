'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function (args) {
  var cwd = args.cwd,
      hash = args.hash,
      devtool = args.devtool,
      limit = args.limit;

  var pkgPath = (0, _path.join)(cwd, 'package.json');
  var pkg = (0, _fs.existsSync)(pkgPath) ? require(pkgPath) : {};

  var jsFileName = hash ? '[name]-[chunkhash].js' : '[name].js';
  var cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css';
  var commonName = hash ? 'common-[chunkhash].js' : 'common.js';

  limit = limit || 10000;

  var babelOptions = (0, _fnGetBabelOptions2.default)();
  var postcssOptions = (0, _fnGetPostcssOptions2.default)();
  var tsOptions = (0, _fnGetTSOptions2.default)();

  var theme = {};

  if (pkg.theme && typeof pkg.theme === 'string') {
    var cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = (0, _path.resolve)(args.cwd, cfgPath);
    }

    var getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
  } else if (pkg.theme && (0, _typeof3.default)(pkg.theme) === 'object') {
    theme = pkg.theme;
  }

  var emptyBuildIns = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls'];

  var browser = pkg.browser || {};

  var node = emptyBuildIns.reduce(function (obj, name) {
    if (!(name in browser)) {
      return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, name, 'empty'));
    }
    return obj;
  }, {});

  return {
    cache: true,

    devtool: devtool,

    node: node,

    entry: pkg.entry,

    output: {
      path: (0, _path.join)(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName
    },

    resolve: {
      modules: ['node_modules', (0, _path.join)(__dirname, '../node_modules')],
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.lazy.js', '.js', '.jsx', '.json']
    },

    module: {
      noParse: [/moment.js/],
      rules: [{
        test: function test(filePath) {
          return (/\.lazy\.jsx?$/.test(filePath)
          );
        },

        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: babelOptions }, { loader: 'bundle-loader?lazy' }]
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

        use: _webpackPlugins.ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader?sourceMap&-restructuring&-autoprefixer' }, { loader: 'postcss-loader', options: postcssOptions }]
        })
      }, {
        test: /\.module\.css$/,
        use: _webpackPlugins.ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer' }, { loader: 'postcss-loader', options: postcssOptions }]
        })
      }, {
        test: function test(filePath) {
          return (/\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
          );
        },

        use: _webpackPlugins.ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap&-autoprefixer', { loader: 'postcss-loader', options: postcssOptions }, 'less-loader?{"sourceMap":true,"modifyVars":' + (0, _stringify2.default)(theme) + '}']
        })
      }, {
        test: /\.module\.less$/,
        use: _webpackPlugins.ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer', { loader: 'postcss-loader', options: postcssOptions }, 'less-loader?{"sourceMap":true,"modifyVars":' + (0, _stringify2.default)(theme) + '}']
        })
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=' + limit + '&minetype=application/font-woff']
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=' + limit + '&minetype=application/font-woff']
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=' + limit + '&minetype=application/octet-stream']
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=' + limit + '&minetype=application/vnd.ms-fontobject']
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=' + limit + '&minetype=image/svg+xml']
      }, {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: ['url-loader?limit=' + limit]
      }, {
        test: /\.html?$/,
        use: ['url-loader?name=[path][name].[ext]']
      }]
    },

    plugins: [new _webpackPlugins.CommonsChunkPlugin({ name: 'common', filename: commonName }), new _webpackPlugins.ExtractTextPlugin({
      filename: cssFileName,
      disable: false,
      allChunks: true
    }), new _webpackPlugins.CaseSensitivePathsPlugin(),

    /*new HtmlWebpackPlugin({
     template: './src/index.html',
     filename: 'index.html'
     }),*/

    new _webpackPlugins.FriendlyErrorsWebpackPlugin({
      onErrors: function onErrors(severity, errors) {
        if (severity !== 'error') {
          _util.notifier.notify({
            title: 'hollow cli',
            message: 'warn',
            contentImage: (0, _path.join)(__dirname, '../assets/warn.png'),
            sound: 'Glass'
          });
          return;
        }

        var error = errors[0];

        _util.notifier.notify({
          title: 'hollow cli',
          message: severity + ' : ' + error.name,
          subtitle: error.file || '',
          contentImage: (0, _path.join)(__dirname, '../assets/fail.png'),
          sound: 'Glass'
        });
      }
    })]
  };
};

var _path = require('path');

var _fs = require('fs');

var _webpackPlugins = require('./webpackPlugins');

var _util = require('./util');

var _fnGetBabelOptions = require('./fnGetBabelOptions');

var _fnGetBabelOptions2 = _interopRequireDefault(_fnGetBabelOptions);

var _fnGetPostcssOptions = require('./fnGetPostcssOptions');

var _fnGetPostcssOptions2 = _interopRequireDefault(_fnGetPostcssOptions);

var _fnGetTSOptions = require('./fnGetTSOptions');

var _fnGetTSOptions2 = _interopRequireDefault(_fnGetTSOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:11.
 **************************************************/
module.exports = exports['default'];