/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:01.
 **************************************************/
import path from 'path'
import fs from 'fs'

import {
  CaseSensitivePathsPlugin,
  CommonsChunkPlugin,
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin
} from './plugins'

import { notifier } from './util'

export default async function (context, next) {
  let {args, packageMap} = context
  let {cwd, hash, devtool, limit, default_node_env} = args

  let env = process.env.NODE_ENV || default_node_env || 'development'

  let jsFileName = hash ? '[name]-[chunkhash].js' : '[name].js'
  let cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  let commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  limit = limit || 10000

  let theme = {}

  if (packageMap.theme && typeof packageMap.theme === 'string') {
    let cfgPath = packageMap.theme
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(cwd, cfgPath)
    }

    let getThemeConfig = require(cfgPath)
    theme = getThemeConfig()
  }

  else if (packageMap.theme && typeof packageMap.theme === 'object') {
    theme = packageMap.theme
  }

  let emptyBuildIns = [
    'child_process', 'cluster', 'dgram', 'dns', 'fs',
    'module', 'net', 'readline', 'repl', 'tls',
  ]

  let browser = packageMap.browser || {}

  let node = emptyBuildIns.reduce((obj, name) => {
    if (!(name in browser)) {
      return {...obj, ...{[name]: 'empty'}}
    }
    return obj
  }, {})

  context.webpackConfig = {
    cache: true,
    devtool,
    node,
    context: args.context || cwd,
    entry: args.entry || packageMap.entry,
    output: {
      path: path.join(cwd, './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },
    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: [
        '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
        '.ts', '.tsx', '.lazy.js', '.js', '.jsx', '.json'
      ],
    },
  }

  context.webpackConfig.plugins = [
    new CommonsChunkPlugin({
      name: 'common',
      filename: commonName,
      minChunks: Infinity,
    }),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          notifier.notify({
            title: 'hollow cli',
            message: 'warn',
            contentImage: path.join(__dirname, '../assets/warn.png'),
            sound: 'Glass',
          })
          return
        }
        const error = errors[0]
        notifier.notify({
          title: 'hollow cli',
          message: `${severity} : ${error.name}`,
          subtitle: error.file || '',
          contentImage: path.join(__dirname, '../assets/fail.png'),
          sound: 'Glass',
        })
      },
    }),
  ]

  if (env === 'production') {
    context.webpackConfig.plugins.push(
      new ExtractTextPlugin({
        filename: cssFileName,
        disable: false,
        allChunks: true
      }))
  }

  next()

  let {babelOptions, postcssOptions, tsOptions} = context

  context.webpackConfig.module = {
    noParse: [/moment.js/],
    rules: [
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
        use: fixStyleLoaders4Production([
          {
            loader: 'css-loader', options: {
            sourceMap: true,
            '-autoprefixer': true,
            '-restructuring': true,
          }
          },
          {loader: 'postcss-loader', options: postcssOptions},
        ], env)
      },
      {
        test: /\.module\.css$/,
        use: fixStyleLoaders4Production([
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
        ], env)
      },
      {
        test (filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
        },
        use: fixStyleLoaders4Production([
          {
            loader: 'css-loader', options: {
            sourceMap: true,
            '-autoprefixer': true,
          }
          },
          {loader: 'postcss-loader', options: postcssOptions},
          {loader: 'less-loader', options: {sourceMap: true, modifyVars: theme}},
        ], env)
      },
      {
        test: /\.module\.less$/,
        use: fixStyleLoaders4Production([
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
        ], env)
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
    ],
  }

}

function fixStyleLoaders4Production (rules, env) {
  let styleLoader = 'style-loader'
  if (env === 'production') {
    return ExtractTextPlugin.extract({fallback: styleLoader, use: rules})
  }
  return [{loader: styleLoader}, ...rules]
}
