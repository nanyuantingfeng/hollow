/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 19:07. *
 ***************************************************/
const { root } = require('./const.env')

module.exports = function(config) {
  config.devServer.merge({
    hot: true,

    hotOnly: true,

    contentBase: root,

    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: false,

    // Enable gzip compression of generated files.
    compress: true,

    progress: true,

    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
    quiet: false,

    disableHostCheck: true,

    clientLogLevel: 'none',

    overlay: false,

    headers: { 'Access-Control-Allow-Origin': '*' },

    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true
    }
  })
}
