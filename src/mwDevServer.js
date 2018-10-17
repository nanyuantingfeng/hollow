/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import { HotModuleReplacementPlugin } from './plugins'
import getStats from './getStats'

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '0.0.0.0'

function parseProxyWithOptions(proxy, options) {
  const oo = {}
  const keys = Object.keys(proxy)
  keys.forEach(key => {
    const target = proxy[key]
    oo[key] = typeof target === 'string' ? { target, ...options } : { ...target, ...options }
  })
  return oo
}

export default async function(context, next) {
  context.devServer = {}
  context.proxy = {}
  context.proxyOptions = { changeOrigin: true }
  context.isDevServer = true

  next()

  let { devServer, proxy, proxyOptions, plugins, DIRs, outputPath } = context

  const proxyObj = parseProxyWithOptions(proxy, proxyOptions)

  context.webpackConfig.devServer = context.devServer = {
    port: context.port || DEFAULT_PORT,

    host: DEFAULT_HOST,

    hot: true,

    hotOnly: true,

    contentBase: DIRs.root,

    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,

    // Enable gzip compression of generated files.
    compress: true,

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
    },

    proxy: proxyObj,

    stats: getStats(false),

    ...devServer
  }

  plugins.push(new HotModuleReplacementPlugin())
}
