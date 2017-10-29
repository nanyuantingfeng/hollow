/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:28.
 **************************************************/
import path from 'path'
import { ExtractTextPlugin } from './plugins'

function fnFixStyleLoaders4Production (rules, isProduction) {
  let styleLoader = 'style-loader'
  if (isProduction) {
    return ExtractTextPlugin.extract({fallback: styleLoader, use: rules})
  }
  return [{loader: styleLoader}, ...rules]
}

function fnGetTheme (packageMap, cwd) {
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

  const {cwd, limit = 10000, ENV, packageMap} = context
  const isProduction = ENV.isProduction
  const theme = fnGetTheme(packageMap, cwd)

  const {babelOptions, postcssOptions, tsOptions, rules} = context

  context.rules = [
    {
      test (filePath) {
        return /\.lazy\.jsx?$/.test(filePath)
      },
      exclude: /node_modules/,
      use: [
        {loader: 'babel-loader', options: babelOptions},
        {loader: 'bundle-loader', options: {lazy: true}}
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{loader: 'babel-loader', options: babelOptions}],
    },
    {
      test: /\.jsx$/,
      use: [{loader: 'babel-loader', options: babelOptions}],
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {loader: 'babel-loader', options: babelOptions},
        {loader: 'ts-loader', options: tsOptions}
      ]
    },
    {
      test (filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
      },
      use: fnFixStyleLoaders4Production([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          '-autoprefixer': true,
          '-restructuring': true,
        }
        },
        {loader: 'postcss-loader', options: postcssOptions},
      ], isProduction)
    },
    {
      test: /\.module\.css$/,
      use: fnFixStyleLoaders4Production([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
          '-autoprefixer': true,
          '-restructuring': true,
        }
        },
        {loader: 'postcss-loader', options: postcssOptions},
      ], isProduction)
    },
    {
      test (filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
      },
      use: fnFixStyleLoaders4Production([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          '-autoprefixer': true,
        }
        },
        {loader: 'postcss-loader', options: postcssOptions},
        {loader: 'less-loader', options: {sourceMap: true, modifyVars: theme}},
      ], isProduction)
    },
    {
      test: /\.module\.less$/,
      use: fnFixStyleLoaders4Production([
        {
          loader: 'css-loader', options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
          '-autoprefixer': true,
        }
        },
        {loader: 'postcss-loader', options: postcssOptions},
        {loader: 'less-loader', options: {sourceMap: true, modifyVars: theme}},
      ], isProduction)
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit, minetype: 'application/font-woff'}}],
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit, minetype: 'application/font-woff'}}],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit, minetype: 'application/octet-stream'}}],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit, minetype: 'application/vnd.ms-fontobject'}}],
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit, minetype: 'image/svg+xml'}}],
    },
    {
      test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [{loader: 'url-loader', options: {limit}}],
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
      test: /\.hbs?$/, use: [{loader: 'mustache-loader'}]
    },
    ...rules
  ]
}