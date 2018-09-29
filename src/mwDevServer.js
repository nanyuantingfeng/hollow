/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import { HotModuleReplacementPlugin } from './plugins'
import getStats from './getStats'
import serveStatic from 'serve-static'

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

    quiet: false,

    disableHostCheck: true,

    clientLogLevel: 'info',

    overlay: false,

    headers: { 'Access-Control-Allow-Origin': '*' },

    historyApiFallback: true,

    proxy: proxyObj,

    stats: getStats(false),

    before(app) {
      app.use(outputPath, serveStatic(DIRs.build))
    },

    ...devServer
  }

  plugins.push(new HotModuleReplacementPlugin())
}
