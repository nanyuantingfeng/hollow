/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 10:21.
 **************************************************/
import notifier from 'node-notifier'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { Context, Entry, ENV, ENVValue, File, FilesMap, PackageMap } from './types'
import { Configuration } from 'webpack'

export { notifier, chalk }

export function getProgressHandler(percent: number, msg1: string, msg2: string) {
  const stream: any = process.stdout
  if (stream.isTTY && percent < 0.7) {
    stream.cursorTo(0)
    stream.write(`\u231B  ${chalk.magenta(msg2)} ${msg1}`)
    stream.clearLine(1)
  } else if (percent >= 1) {
    console.log(chalk.green('\nwebpack: bundle build is now finished'))
  }
}

export function checkWebpackConfig(webpackConfig: Configuration) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    let e = new Error('no webpack entry found')
    e.name = 'NoEntry'
    throw e
  }
}

export function getValueByPath(path: string) {
  return !fs.existsSync(path) ? {} : require(path)
}

export function getBuildCopyFiles(files: File[]): any {
  if (Array.isArray(files)) {
    return files.map(from => ({ from }))
  }
  return Object.keys(files)
    .filter(key => {
      const file: any = files[key]
      return typeof file === 'string' || !!file.path
    })
    .map(key => {
      const file: any = files[key]
      if (typeof file === 'string') {
        return { from: file }
      }
      return { from: file.path, to: file.to }
    })
}

export function getBuildExternals(files: FilesMap): FilesMap {
  const ret: FilesMap = {}
  Object.keys(files).forEach(key => {
    const file = files[key]
    if (typeof file === 'string') {
      ret[key] = file
    } else if (file.name) {
      ret[key] = file.name
    }
  })
  return ret
}

export function getBuild4DevelopmentENV(filesMap: FilesMap) {
  const ret: File[] = []
  Object.keys(filesMap).forEach(key => {
    const line: any = filesMap[key]
    const path = line.path
    if (line.name && path) {
      ret.push(path)
    }
  })
  return ret
}

export function getBuild4ProductionENV(filesMap: FilesMap) {
  const ret: File[] = []
  Object.keys(filesMap).forEach(key => {
    const line: any = filesMap[key]
    let path = line.path
    if (line.name && path) {
      const paths = path.split('/')
      path = paths[paths.length - 1]
      ret.push(path)
    }
  })
  return ret
}

export function getBuildHTMLData(filesMap: FilesMap, env: ENVValue) {
  switch (env) {
    case 'production':
    case 'beta':
      return getBuild4ProductionENV(filesMap)
    default:
      return getBuild4DevelopmentENV(filesMap)
  }
}

export function getBuildHTML(context: Context) {
  const { externals = {}, sdks = {}, DLL_FILENAME, ENV, htmlWebpackPluginOptions, compress } = context

  let entry = context.entry || context.packageMap.entry || getExampleEntry(context)

  if (!entry) {
    throw new Error('entry is an invalid value')
  }

  if (typeof entry === 'string') {
    context.entry = entry = { index: entry }
  }
  const paths = getBuildHTMLData(externals, ENV.env)
  const entryNames = Object.keys(entry)

  const options = {
    chunksSortMode: 'none',
    template: path.join(__dirname, '../assets/index.hbs'),
    favicon: path.join(__dirname, '../assets/favicon.ico'),
    ...htmlWebpackPluginOptions
  }

  return entryNames.map(entryName => {
    let sdk = sdks[entryName]

    if (typeof sdk === 'string') {
      sdk = [sdk]
    }

    let scripts = paths.slice(0)

    if (sdk) {
      scripts.push(...sdk)
    }

    if (DLL_FILENAME) {
      scripts.push(DLL_FILENAME as string)
    }

    return {
      PATHS: scripts,
      scripts,
      entryName: entryName,
      filename: `${entryName}.html`,
      chunks: [entryName],
      chunksSortMode: 'dependency',
      inject: true,
      templateParameters: getBuildTemplateParametersWithScripts(scripts),
      minify: compress
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : null,
      ...options
    }
  })
}

export function createDomain({ host, port }: { host: string; port: string | number }) {
  return `http://${host}:${port}`
}

export function getNodeVersion(packageMap: PackageMap) {
  const emptyBuildIns = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls']

  const browser = packageMap.browser || {}

  return emptyBuildIns.reduce((obj, name) => {
    if (!(name in browser)) {
      return { ...obj, ...{ [name]: 'empty' } }
    }
    return obj
  }, {})
}

export function getBuildSourceMap(devtool: boolean | string = false, ENV: ENV) {
  /******************
   *#source-map 编译过慢
   * production 环境不需要
   * beta 环境需要
   */

  if (devtool === true) {
    devtool = ENV.isProduction ? false : '#cheap-module-eval-source-map'
  }

  return devtool
}

export function getBuildTemplateParametersWithScripts(scripts: any[]) {
  return (compilation: any, assets: any, options: any) => {
    const entryName = options.entryName
    const stats = compilation.getStats().toJson()
    const currentAssets = stats.entrypoints[entryName].assets

    const js = currentAssets.filter((n: any) => path.extname(n) === '.js')
    const css = currentAssets.filter((n: any) => path.extname(n) === '.css')

    assets.js = unique(scripts.concat(assets.js).concat(js))
    assets.css = unique(assets.css.concat(css))

    return {
      compilation: compilation,
      webpack: compilation.getStats().toJson(),
      webpackConfig: compilation.options,

      htmlWebpackPlugin: {
        files: assets,
        options: options,
        scripts: js,
        styles: css
      }
    }
  }
}

function unique(array: any[]) {
  return array.filter((item, index, array) => array.indexOf(item) === index)
}

export function getOptions<T>(options: boolean | string | object, defaultOptions: any = {}): T {
  return options === true ? (defaultOptions as T) : ((options as unknown) as T)
}

export function PromiseDefer<T>() {
  let resolve: Function = void 0
  let reject: Function = void 0
  const promise = new Promise<T>((rs, rj) => {
    resolve = rs
    reject = rj
  })
  return { promise, resolve, reject }
}

export function getExampleEntry(context: Context) {
  if (!context.ENV.isDevelopment) {
    return null
  }

  let entry: Entry = null
  ;['js', 'jsx', 'ts', 'tsx'].forEach(ext => {
    if (fs.existsSync(path.join(context.DIRs.root, 'example', `index.${ext}`))) {
      entry = `./example/index.${ext}`
    }
  })

  return entry
}