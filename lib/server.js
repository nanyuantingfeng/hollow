'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (args) {
  var _webpackConfig$plugin;

  var webpackConfig = (0, _build.getWebpackConfig)(args, {});

  webpackConfig.devServer = {
    contentBase: false,
    hot: true,
    noInfo: false,
    host: '0.0.0.0',
    port: '6000',
    inline: true,
    historyApiFallback: true
  };

  (_webpackConfig$plugin = webpackConfig.plugins).push.apply(_webpackConfig$plugin, [new _webpackPlugins.HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
  }),

  // 开启webpack全局热更新
  new _webpackPlugins.HotModuleReplacementPlugin(),
  // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
  new _webpackPlugins.NamedModulesPlugin()]);
};

var _webpackPlugins = require('./webpackPlugins');

var _build = require('./build');

module.exports = exports['default']; /**************************************************
                                      * Created by nanyuantingfeng on 12/06/2017 00:08.
                                      **************************************************/