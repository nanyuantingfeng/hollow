/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 19:07. *
 ***************************************************/

const { root } = require("./const.env");

module.exports = function(config) {
  config.devServer.merge({
    hot: true,

    hotOnly: true,

    contentBase: root,

    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: false,

    // Enable gzip compression of generated files.
    compress: true,

    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
    quiet: false,

    disableHostCheck: true,

    clientLogLevel: "none",

    overlay: false,

    headers: { "Access-Control-Allow-Origin": "*" },

    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true
    },

    stats: {
      all: undefined,

      // 添加资源信息
      assets: true,

      // 对资源按指定的字段进行排序
      assetsSort: "field",

      // 添加构建时间信息
      builtAt: true,

      // 添加模块被引入的原因
      reasons: true,

      colors: true,

      version: true,

      children: true,

      // 添加 compilation 的哈希值
      hash: false,

      // 添加时间信息
      timings: true,

      // 添加警告
      warnings: false,

      // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
      performance: false,

      cached: false,

      cachedAssets: false,

      chunks: false,

      // 添加构建模块信息
      modules: false,

      // 将构建模块信息添加到 chunk 信息
      chunkModules: false,

      // 添加 --env information
      env: true,

      // 显示每个模块到入口起点的距离(distance)
      depth: false,

      exclude: /node_modules/
    }
  });
};
