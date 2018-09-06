/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:28.
 **************************************************/
import os from 'os'
import path from 'path'
import { MiniCssExtractPlugin, HappyPack, WatchIgnorePlugin } from './plugins'

const EXCLUDE_REG_NODE_MODULES = /[/\\\\]node_modules[/\\\\]/

function fnGetThemeMap(packageMap, cwd) {
  let theme = {}

  const packageMapTheme = packageMap.theme

  if (packageMapTheme && typeof packageMapTheme === 'string') {
    let pp = packageMapTheme

    if (pp.charAt(0) === '.') {
      pp = path.resolve(cwd, pp)
    }

    const fn = require(pp)
    theme = fn()
  } else if (packageMapTheme && typeof packageMapTheme === 'object') {
    theme = packageMapTheme
  }

  return theme
}

function XSX_LOADER(context) {
  const { enableHappypack = true } = context
  return enableHappypack ? happypackLoaders(context) : commonLoaders(context, false)
}

function happypackLoaders(context) {
  const { JSX_LOADER, TSX_LOADER } = commonLoaders(context, true)
  const THREAD_POOL_CPU_SIZE = os.cpus().length
  const threadPool = HappyPack.ThreadPool({ size: THREAD_POOL_CPU_SIZE })
  const { plugins } = context

  plugins.push(
    new HappyPack({
      id: 'jsx',
      threadPool,
      loaders: JSX_LOADER
    })
  )

  plugins.push(
    new HappyPack({
      id: 'tsx',
      threadPool,
      loaders: TSX_LOADER
    })
  )

  return {
    JSX_LOADER: [{ loader: 'happypack/loader', options: { id: 'jsx' } }],
    TSX_LOADER: [{ loader: 'happypack/loader', options: { id: 'tsx' } }]
  }
}

function commonLoaders(context, enableHappypack) {
  const { babelOptions, tsOptions } = context

  const JSX_LOADER = [{ loader: 'babel-loader', options: babelOptions }]

  let tsOptions2 = tsOptions

  if (enableHappypack) {
    tsOptions2 = { happyPackMode: true, ...tsOptions }
  }

  const TSX_LOADER = [{ loader: 'ts-loader', options: tsOptions2 }]

  return { JSX_LOADER, TSX_LOADER }
}

export default async function(context, next) {
  context.rules = []

  next()

  const { cwd, limit = 10240, ENV, packageMap, hash, plugins, isNeedTSChecker } = context
  const theme = fnGetThemeMap(packageMap, cwd)
  const { postcssOptions, tsConfigPath, rules } = context
  const workerFileName = hash ? '[name]-[hash].worker.js' : '[name].worker.js'

  const { JSX_LOADER, TSX_LOADER } = XSX_LOADER(context)

  const scriptRules = [
    {
      test: /\.worker\.jsx?$/,
      exclude: [EXCLUDE_REG_NODE_MODULES],
      use: [{ loader: 'worker-loader', options: { name: workerFileName } }, ...JSX_LOADER]
    },
    {
      test(filePath) {
        return /\.lazy\.jsx?$/.test(filePath)
      },
      exclude: [EXCLUDE_REG_NODE_MODULES],
      use: [{ loader: 'bundle-loader', options: { lazy: true } }, ...JSX_LOADER]
    },
    {
      test(filePath) {
        return (
          /\.jsx?$/.test(filePath) &&
          !/\.lazy\.jsx?$/.test(filePath) &&
          !/\.worker\.jsx?$/.test(filePath)
        )
      },
      exclude: [EXCLUDE_REG_NODE_MODULES],
      use: JSX_LOADER
    },
    {
      test: /\.tsx?$/,
      exclude: [EXCLUDE_REG_NODE_MODULES],
      use: TSX_LOADER
    }
  ]
  const stylesRules = [
    {
      test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
      },
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        { loader: 'postcss-loader', options: postcssOptions }
      ]
    },
    {
      test: /\.module\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        { loader: 'postcss-loader', options: postcssOptions }
      ]
    },
    {
      test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
      },
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: true,
            modifyVars: theme
          }
        }
      ]
    },
    {
      test: /\.module\.less$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: true,
            modifyVars: theme
          }
        }
      ]
    }
  ]
  const othersRules = [
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: { limit, mimetype: 'application/font-woff' }
        }
      ]
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: { limit, mimetype: 'application/font-woff' }
        }
      ]
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: { limit, mimetype: 'application/octet-stream' }
        }
      ]
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: { limit, mimetype: 'application/vnd.ms-fontobject' }
        }
      ]
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: { limit, mimetype: 'image/svg+xml' }
        }
      ]
    },
    {
      test: /\.svgx$/,
      use: [{ loader: '@svgr/webpack' }]
    },
    {
      test: /\.json5$/,
      use: [{ loader: 'json5-loader' }]
    },
    {
      test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [{ loader: 'file-loader', options: { limit } }]
    },
    {
      test: /\.html?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path]-[name].[ext]'
          }
        }
      ]
    },
    {
      test: /\.hbs?$/,
      use: [{ loader: 'mustache-loader' }]
    }
  ]

  let styleRulesFixed = stylesRules

  if (ENV.isProduction || ENV.isBeta) {
    styleRulesFixed = stylesRules.map(rule => {
      rule.use[0] = MiniCssExtractPlugin.loader
      return rule
    })
  }

  context.rules = scriptRules
    .concat(styleRulesFixed)
    .concat(othersRules)
    .concat(rules)

  plugins.push(new WatchIgnorePlugin([/\.d\.ts$/]))
}
