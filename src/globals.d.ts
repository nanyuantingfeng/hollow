/******************************************************
 * Created by nanyuantingfeng on 2019-04-01 15:57.
 *****************************************************/

declare module 'postcss-flexbugs-fixes' {
  const value: any
  export default value
}

declare module 'webpack-dev-server/lib/utils/createLogger' {
  const createLogger: Function
  export default createLogger
}

declare module 'happypack' {
  import { Plugin } from 'webpack'
  interface Pool {}

  interface PluginOptions {
    id?: string
    threadPool?: Pool
    loaders: any
  }

  declare class Happypack extends Plugin {
    constructor(options: PluginOptions)

    static ThreadPool(options: any): Pool
  }

  export = Happypack
}

declare module 'webpack-cdn-plugin' {
  import { Plugin } from 'webpack'

  interface WebpackCdnPluginOptions {}

  declare class WebpackCdnPlugin extends Plugin {
    constructor(options: WebpackCdnPluginOptions)
  }

  export = WebpackCdnPlugin
}
