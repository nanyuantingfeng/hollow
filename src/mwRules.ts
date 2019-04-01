/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:28.
 **************************************************/
import os from 'os'
import path from 'path'
import { WatchIgnorePlugin } from './plugins'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import HappyPack from 'happypack'
import { Context, Next, PackageMap } from './types'

const REG_NODE_MODULES = /node_modules/

function getThemeMap(packageMap: PackageMap, cwd: string) {
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

function getLoaderMode(context: Context) {
  const { enableHappyPack = true, importPluginOptions } = context

  if (importPluginOptions && !Array.isArray(importPluginOptions)) {
    throw new Error('context.importOptions must be an array')
  }

  return !importPluginOptions && enableHappyPack ? happypackLoaders(context) : commonLoaders(context)
}

function happypackLoaders(context: Context) {
  const { JSX_LOADER, TSX_LOADER } = commonLoaders(context)
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

function commonLoaders(context: Context) {
  const { babelOptions, tsOptions } = context

  const JSX_LOADER = [{ loader: 'babel-loader', options: babelOptions } /*, getReplaceLodashLoader()*/]

  const TSX_LOADER = [{ loader: 'ts-loader', options: tsOptions }]

  return { JSX_LOADER, TSX_LOADER }
}

export default async function mwRules(context: Context, next: Next) {
  context.rules = []

  next()

  const { cwd, limit = 10240, ENV, packageMap, hash, plugins } = context
  const theme = getThemeMap(packageMap, cwd)
  const { postcssOptions, rules } = context
  const { JSX_LOADER, TSX_LOADER } = getLoaderMode(context)

  const scriptRules = [
    {
      test: /\.worker\.jsx?$/,
      exclude: [REG_NODE_MODULES],
      use: [{ loader: 'workerize-loader' }, ...JSX_LOADER]
    },
    {
      test: /\.worker\.tsx?$/,
      exclude: [REG_NODE_MODULES],
      use: [{ loader: 'workerize-loader' }, ...TSX_LOADER]
    },
    {
      test(filePath: string) {
        return /\.jsx?$/.test(filePath) && !/\.worker\.jsx?$/.test(filePath)
      },
      exclude: [REG_NODE_MODULES, /@babel(?:\/|\\{1,2})runtime/],
      use: JSX_LOADER
    },
    {
      test(filePath: string) {
        return /\.tsx?$/.test(filePath) && !/\.worker\.tsx?$/.test(filePath)
      },

      exclude: [REG_NODE_MODULES],
      use: TSX_LOADER
    },
    {
      test: /\.mjsx?$/,
      include: [REG_NODE_MODULES],
      type: 'javascript/auto'
    },
    {
      test: /\.(graphql|gql)$/,
      exclude: [REG_NODE_MODULES],
      use: [{ loader: 'graphql-tag/loader' }]
    }
  ]
  const stylesRules = [
    {
      test(filePath: string) {
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
      test(filePath: string) {
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
      test: /\.svgx$/,
      use: [{ loader: '@svgr/webpack' }]
    },
    {
      test: /\.json5$/,
      use: [{ loader: 'json5-loader' }]
    },
    {
      test: /\.(woff|woff2)?(\?v=\d+\.\d+\.\d+)?$/,
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
      test: /\.(bmp|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
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

  if (ENV.isProduction || ENV.isBeta) {
    stylesRules.map((rule: any) => (rule.use[0] = MiniCSSExtractPlugin.loader))
    const filename = hash ? '[name]-[contenthash:8].css' : '[name].css'
    const chunkFilename = hash ? '[name]-[contenthash:8].chunk.css' : '[name].chunk.css'
    plugins.push(new MiniCSSExtractPlugin({ filename, chunkFilename }))
  }

  context.rules = scriptRules
    // @ts-ignore
    .concat([{ parser: { requireEnsure: false } }])
    .concat(stylesRules)
    .concat(othersRules)
    .concat(rules)

  plugins.push(new WatchIgnorePlugin([/\.d\.ts$/]))
}
