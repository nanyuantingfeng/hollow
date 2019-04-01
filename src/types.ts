/******************************************************
 * Created by nanyuantingfeng on 2019-04-01 16:05.
 *****************************************************/

import { Plugin } from 'webpack'
import { Configuration } from 'webpack'

export type File =
  | {
      name: string
      path: string
      to: string
    }
  | string

export type FilesMap = { [key: string]: File }

export type ENVValue = 'development' | 'beta' | 'production'

export type Next = () => void

export type ENV = {
  isProduction: boolean
  isDevelopment: boolean
  isBeta: boolean
  env: ENVValue
}

export type Entry = string | { [key: string]: string } | string[]

export type PackageMap = {
  name: string
  description: string
  entry?: Entry
  browser?: any
  theme?: string | object
  version: string
  proxy?: string | object
}

export type Context = {
  entry: Entry
  packageMap: PackageMap
  ENV: ENV
  DIRs: {
    root: string // 项目根目录
    cwd: string
    src: string // 项目业务代码根目录
    source: string
    build: string // 生成文件目录
    dist: string
  }

  babelOptions: object & {
    cacheDirectory: boolean
    babelrc: boolean
    highlightCode: boolean
    presets: any[]
    plugins: any[]
  }
  typescriptOptions: object
  tsOptions: any
  importPluginOptions: object[]
  enableHappyPack: boolean
  enablePWA: boolean
  pwaManifestOptions: object
  postcssOptions: {
    sourceMap: boolean
    plugins: any[]
  }
  publicPath: string
  hash: boolean
  compress: boolean
  plugins: Plugin[]
  dll: boolean | string | string[]
  DLL_FILENAME: boolean | string

  proxy: string | object
  proxyOptions: object
  isDevServer: boolean
  port: string | number
  devServer: any

  output:
    | string
    | {
        path?: string
        filename?: string
        library?: string
        chunkFilename?: string
        globalObject?: string
        pathinfo?: boolean
        publicPath?: string
      }

  context: string

  webpackConfig: any | any[]
  records: boolean | string | object
  analyzer: boolean | object
  optimizeLodash: boolean | object
  verbose: boolean
  watch: boolean

  files: File[]
  externals: FilesMap
  version: string
  provides: {
    [p: string]: any
  }

  [key: string]: any
}
