/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:28.
 **************************************************/
import os from 'os'
import path from 'path'
import { ExtractTextPlugin } from './plugins'
import HappyPack, { ThreadPool } from 'happypack'

const happyThreadPool = ThreadPool({ size: os.cpus().length })

function fnFixStyleLoaders4ENV(rules, ENV) {
  const extractLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader', use: rules
  })

  if (ENV.isDevelopment) {
    return ['css-hot-loader'].concat(extractLoader)
  }

  if (ENV.isProduction || ENV.isBeta) {
    return extractLoader
  }
}

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
  }

  else if (packageMapTheme && typeof packageMapTheme === 'object') {
    theme = packageMapTheme
  }

  return theme
}

export default async function (context, next) {
  context.rules = []
  next()

  const { cwd, limit = 10000, ENV, packageMap, hash, plugins } = context
  const theme = fnGetThemeMap(packageMap, cwd)
  const { babelOptions, postcssOptions, tsOptions, rules } = context
  const workerFileName = hash ? '[hash].worker.js' : '[name].worker.js'

  context.rules = [
    {
      test: /\.worker\.jsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader', options: babelOptions },
        { loader: 'worker-loader', options: { name: workerFileName } },
      ]
    },
    {
      test(filePath) {
        return /\.lazy\.jsx?$/.test(filePath)
      },
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader', options: babelOptions },
        { loader: 'bundle-loader', options: { lazy: true } },
      ]
    },
    {
      test(filePath) {
        return /\.jsx?$/.test(filePath) && !/\.lazy\.jsx$/.test(filePath) && !/\.worker\.jsx$/.test(filePath)
      },
      exclude: /node_modules/,
      use: [{ loader: 'happypack/loader', options: { id: 'jsx' } }],
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{ loader: 'happypack/loader', options: { id: 'tsx' } }],
    },
    {
      test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
      },
      use: fnFixStyleLoaders4ENV([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          '-autoprefixer': true,
          '-restructuring': true,
        }
        },
        { loader: 'postcss-loader', options: postcssOptions },
      ], ENV)
    },
    {
      test: /\.module\.css$/,
      use: fnFixStyleLoaders4ENV([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
          '-autoprefixer': true,
          '-restructuring': true,
        }
        },
        { loader: 'postcss-loader', options: postcssOptions },
      ], ENV)
    },
    {
      test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
      },
      use: fnFixStyleLoaders4ENV([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          '-autoprefixer': true,
        }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } },
      ], ENV)
    },
    {
      test: /\.module\.less$/,
      use: fnFixStyleLoaders4ENV([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
          '-autoprefixer': true,
        }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } },
      ], ENV)
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, minetype: 'application/font-woff' }
      }],
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, minetype: 'application/font-woff' }
      }],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, minetype: 'application/octet-stream' }
      }],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, minetype: 'application/vnd.ms-fontobject' }
      }],
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, minetype: 'image/svg+xml' }
      }],
    },
    {
      test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [{ loader: 'url-loader', options: { limit } }],
    },
    {
      test: /\.html?$/,
      use: [{
        loader: 'file-loader', options: {
          name: '[path][name].[ext]',
        }
      }],
    },
    {
      test: /\.hbs?$/, use: [{ loader: 'mustache-loader' }]
    },
    ...rules
  ]

  plugins.push(new HappyPack({
    id: 'jsx', threadPool: happyThreadPool,
    loaders: [{ loader: 'babel-loader', options: babelOptions }],
  }))

  tsOptions.happyPackMode = true
  
  plugins.push(new HappyPack({
    id: 'tsx', threadPool: happyThreadPool,
    loaders: [
      { loader: 'babel-loader', options: babelOptions },
      { loader: 'ts-loader', options: tsOptions }
    ]
  }))
}
