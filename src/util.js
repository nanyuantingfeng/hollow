/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 10:21.
 **************************************************/
import notifier from 'node-notifier'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

export { notifier, chalk, }

export function fnProgressHandler (percent, msg1, msg2) {
  let stream = process.stdout
  if (stream.isTTY && percent < .70) {
    stream.cursorTo(0)
    stream.write(`\u231B  ${chalk.magenta(msg2)} ${msg1}`)
    stream.clearLine(1)
  } else if (percent >= 1) {
    console.log(chalk.green('\nwebpack: bundle build is now finished'))
  }
}

export function fnCheckWebpackConfig (webpackConfig) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    let e = new Error('no webpack entry found')
    e.name = 'NoEntry'
    throw e
  }
}

export function fnGetValueByPath (path) {
  return !fs.existsSync(path) ? {} : require(path)
}

export function fnBuildCopyFiles (files) {
  if (Array.isArray(files)) {
    return files.map(from => ({from}))
  }
  return Object.keys(files).filter(key => {
    let file = files[key]
    return typeof file === 'string' || !!files[key].path
  }).map(key => {
    let file = files[key]
    if (typeof file === 'string') {
      return {from: file}
    }
    return {from: file.path, to: file.to}
  })
}

export function fnBuildExternals (files) {
  let ret = {}
  Object.keys(files).forEach(key => {
    let file = files[key]
    if (typeof file === 'string') {
      ret[key] = file
    } else if (file.name) {
      ret[key] = file.name
    }
  })
  return ret
}

export function fnBuild4DevelopmentENV (filesMap) {
  let ret = []
  Object.keys(filesMap).forEach(key => {
    let line = filesMap[key]
    let path = line.path
    if (line.name && path) {
      ret.push(path)
    }
  })
  return ret
}

export function fnBuild4ProductionENV (filesMap) {
  let ret = []
  Object.keys(filesMap).forEach(key => {
    let line = filesMap[key]
    let path = line.path
    if (line.name && path) {
      let paths = path.split('/')
      path = paths[paths.length - 1]
      ret.push(path)
    }
  })
  return ret
}

export function fnBuildHTMLData (filesMap, env) {
  switch (env) {
    case 'production' :
    case 'beta' :
      return fnBuild4ProductionENV(filesMap)
    default:
      return fnBuild4DevelopmentENV(filesMap)
  }
}

export function fnBuildHTML (context, env) {
  const {externals = {}, sdks = {}, DLL_FILENAME, htmlWebpackPluginOptions} = context

  let entry = context.entry || context.packageMap.entry

  if (!entry) {
    throw new Error('entry is an invalid value')
  }

  if (typeof entry === 'string') {
    context.entry = entry = {index: entry}
  }
  const paths = fnBuildHTMLData(externals, env)
  const entryNames = Object.keys(entry)

  const options = {
    template: path.join(__dirname, '../assets/index.hbs'),
    favicon: path.join(__dirname, '../assets/favicon.ico'),
    ...htmlWebpackPluginOptions
  }

  return entryNames.map(name => {
    let sdk = sdks[name]

    if (typeof sdk === 'string') {
      sdk = [sdk]
    }

    let paths0 = paths.slice(0)

    if (sdk) {
      paths0.push(...sdk)
    }

    if (DLL_FILENAME) {
      paths0.push(DLL_FILENAME)
    }

    return {
      PATHS: paths0,
      filename: `${name}.html`,
      chunks: ['common', name],
      chunksSortMode: 'dependency',
      ...options
    }
  })
}

export function createDomain ({host, port}) {
  return `http://${host}:${port}`
}

export function addDevServerEntrypoints (webpackOptions, devServerOptions) {

  if (devServerOptions.inline === false) {
    return
  }

  const domain = createDomain(devServerOptions)

  const devClient = [
    //'react-hot-loader/patch',
    `webpack-dev-server/client?${domain}`,
  ]

  if (devServerOptions.hotOnly) {
    devClient.push('webpack/hot/only-dev-server')
  } else if (devServerOptions.hot) {
    devClient.push('webpack/hot/dev-server')
  }

  [].concat(webpackOptions).forEach((wpOpt) => {
    if (typeof wpOpt.entry === 'object' && !Array.isArray(wpOpt.entry)) {
      Object.keys(wpOpt.entry).forEach((key) => {
        wpOpt.entry[key] = devClient.concat(wpOpt.entry[key])
      })
    } else if (typeof wpOpt.entry === 'function') {
      wpOpt.entry = wpOpt.entry(devClient)
    } else {
      wpOpt.entry = devClient.concat(wpOpt.entry)
    }
  })

}

export function fnGetNode (packageMap) {

  const emptyBuildIns = [
    'child_process', 'cluster', 'dgram', 'dns', 'fs',
    'module', 'net', 'readline', 'repl', 'tls',
  ]

  const browser = packageMap.browser || {}

  return emptyBuildIns.reduce((obj, name) => {
    if (!(name in browser)) {
      return {...obj, ...{[name]: 'empty'}}
    }
    return obj
  }, {})

}

export function fnBuildSourceMap (devtool = false, ENV) {
  /******************
   *#source-map 编译过慢
   * production 环境不需要
   * beta 环境需要
   */

  if (devtool === true) {
    devtool = ENV.isProduction ? false
      : ENV.isDevelopment ? '#cheap-module-eval-source-map'
        : ENV.isBeta ? '#cheap-module-source-map'
          : false
  }

  return devtool
}
