/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 18:42. *
 ***************************************************/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { env } = require('./const.env')

function unique(array) {
  return array.filter((item, index, array) => array.indexOf(item) === index)
}

function getBuildTemplateParametersWithScripts(scripts) {
  return (compilation, assets, options) => {
    const entryName = options.entryName
    const stats = compilation.getStats().toJson()
    const currentAssets = stats.entrypoints[entryName].assets

    const js = currentAssets.filter(n => path.extname(n) === '.js').map(a => fixPublicPath(compilation.options, a))
    const css = currentAssets.filter(n => path.extname(n) === '.css').map(a => fixPublicPath(compilation.options, a))
    const scripts2 = scripts.map(a => fixPublicPath(compilation.options, a))

    assets.js = unique(scripts2.concat(assets.js).concat(js))
    assets.css = unique(assets.css.concat(css))

    return {
      compilation: compilation,
      webpack: compilation.getStats().toJson(),
      webpackConfig: compilation.options,

      htmlWebpackPlugin: {
        files: assets,
        options: options,
        scripts: js,
        styles: css,
        cdnModule: entryName
      }
    }
  }
}

function fixPublicPath(options, url) {
  if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
    return url
  }

  const slash = '/'
  const { output } = options
  let { publicPath = './' } = output

  if (publicPath.slice(-1) !== slash) {
    publicPath += slash
  }

  let prefix = publicPath

  if (prefix.slice(-1) !== slash) {
    prefix += slash
  }

  return prefix + url
}

function getBuild4DevelopmentENV(filesMap) {
  const ret = []
  Object.keys(filesMap).forEach(key => {
    const line = filesMap[key]
    const path = line.path
    if (line.name && path) {
      ret.push(path)
    }
  })
  return ret
}

function getBuild4ProductionENV(filesMap) {
  const ret = []
  Object.keys(filesMap).forEach(key => {
    const line = filesMap[key]
    let path = line.path
    if (line.name && path) {
      const paths = path.split('/')
      path = paths[paths.length - 1]
      ret.push(path)
    }
  })
  return ret
}

function getBuildHTMLData(filesMap, env) {
  if (!filesMap) return []

  switch (env) {
    case 'production':
    case 'beta':
      return getBuild4ProductionENV(filesMap)
    default:
      return getBuild4DevelopmentENV(filesMap)
  }
}

module.exports = function(entries, sdks, externals) {
  sdks = sdks || {}

  return config => {
    const keys = Object.keys(entries)

    keys.forEach((entryName, i) => {
      const pluginName = i === 0 ? 'HtmlWebpackPlugin' : 'HtmlWebpackPlugin' + '::' + entryName

      const externalsFiles = getBuildHTMLData(externals, env)

      let sdk = sdks[entryName] || []

      if (typeof sdk === 'string') {
        sdk = [sdk]
      }

      const scripts = (externalsFiles || []).slice(0)
      scripts.push(...sdk)

      config.plugin(pluginName).use(HtmlWebpackPlugin, [
        {
          inject: true,
          /***
           * for fix assets.js(chunk) did not output <body> ,
           * but WebpackCdnPlugin already fix this bug
           */

          entryName: entryName,
          cdnModule: entryName,
          filename: `${entryName}.html`,
          chunks: [entryName],

          chunksSortMode: 'dependency',
          template: path.join(__dirname, '../assets/index.hbs'),
          favicon: path.join(__dirname, '../assets/favicon.ico'),

          templateParameters: getBuildTemplateParametersWithScripts(scripts)
        }
      ])
    })
  }
}
