/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:28.
 **************************************************/
import os from 'os'
import path from 'path'
import { ExtractTextPlugin, ForkTsCheckerWebpackPlugin } from './plugins'
import HappyPack, { ThreadPool } from 'happypack'

function fnUseExtractTextPlugin(styleRules, ENV) {

  if (ENV.isProduction || ENV.isBeta) {
    styleRules = styleRules.map(rule => {
      rule.use.shift()
      const use = rule.use
      rule.use = ExtractTextPlugin.extract({ fallback: 'style-loader', use })
      return rule
    })
  }

  return styleRules

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

  const scriptRules = [
    {
      test: /\.worker\.jsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'worker-loader', options: { name: workerFileName } },
        { loader: 'happypack/loader', options: { id: 'jsx' } }
      ]
    },
    {
      test(filePath) {
        return /\.lazy\.jsx?$/.test(filePath)
      },
      exclude: /node_modules/,
      use: [
        { loader: 'bundle-loader', options: { lazy: true } },
        { loader: 'happypack/loader', options: { id: 'jsx' } },
      ]
    },
    {
      test(filePath) {
        return /\.jsx?$/.test(filePath) && !/\.lazy\.jsx?$/.test(filePath) && !/\.worker\.jsx?$/.test(filePath)
      },
      exclude: /node_modules/,
      include: /src/,
      use: [{ loader: 'happypack/loader', options: { id: 'jsx' } }],
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules|typings|.*\.js/,
      use: [
        { loader: 'happypack/loader', options: { id: 'tsx' } }
      ],
    },
  ]
  const stylesRules = [
    {
      test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
      },
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader', options: {
            sourceMap: true,
            minimize: !ENV.isDevelopment,
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
      ]
    },
    {
      test: /\.module\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader', options: {
            sourceMap: true,
            modules: true,
            minimize: !ENV.isDevelopment,
            localIdentName: '[local]___[hash:base64:5]',
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
      ]
    },
    {
      test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
      },
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader', options: {
            sourceMap: true,
            minimize: !ENV.isDevelopment,
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } },
      ]
    },
    {
      test: /\.module\.less$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader', options: {
            sourceMap: true,
            modules: true,
            minimize: !ENV.isDevelopment,
            localIdentName: '[local]___[hash:base64:5]',
          }
        },
        { loader: 'postcss-loader', options: postcssOptions },
        { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } },
      ]
    },
  ]
  const othersRules = [
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, mimetype: 'application/font-woff' }
      }],
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, mimetype: 'application/font-woff' }
      }],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, mimetype: 'application/octet-stream' }
      }],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, mimetype: 'application/vnd.ms-fontobject' }
      }],
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit, mimetype: 'image/svg+xml' }
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
  ]

  context.rules = scriptRules
    .concat(fnUseExtractTextPlugin(stylesRules, ENV))
    .concat(othersRules)
    .concat(rules)

  const size = os.cpus().length >= 4 ? 4 : 2

  const threadPool = ThreadPool({ size })

  plugins.push(new HappyPack({
    id: 'jsx',
    threadPool,
    loaders: [{ loader: 'babel-loader', options: babelOptions }],
  }))

  plugins.push(new HappyPack({
    id: 'tsx',
    threadPool,
    loaders: [{ loader: 'ts-loader', options: tsOptions }]
  }))

  plugins.push(new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
    colors: true,
    async: true,
    tslint: true,
  }))
}
