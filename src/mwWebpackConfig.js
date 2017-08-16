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
} from './webpackPlugins'

import { notifier } from './util'

export default async function (context, next) {
  next()

  let {babelOptions, postcssOptions, tsOptions, args} = context

  let {cwd, hash, devtool, limit} = args
 
  let pkgPath = path.join(cwd, 'package.json')
  let pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
 
  let jsFileName = hash ? '[name]-[chunkhash].js' : '[name].js'
  let cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  let commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  limit = limit || 10000

  let theme = {}

  if (pkg.theme && typeof pkg.theme === 'string') {
    let cfgPath = pkg.theme
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(args.cwd, cfgPath)
    }

    let getThemeConfig = require(cfgPath)
    theme = getThemeConfig()
  }

  else if (pkg.theme && typeof pkg.theme === 'object') {
    theme = pkg.theme
  }

  let emptyBuildIns = [
    'child_process', 'cluster', 'dgram', 'dns', 'fs',
    'module', 'net', 'readline', 'repl', 'tls',
  ]

  let browser = pkg.browser || {}

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

    entry: pkg.entry,

    output: {
      path: path.join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: [
        '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
        '.ts', '.tsx', '.lazy.js', '.js', '.jsx', '.json'],
    },

    module: {
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader', options: {
                sourceMap: true,
                '-autoprefixer': true,
                '-restructuring': true,
              }
              },
              {loader: 'postcss-loader', options: postcssOptions},
            ]
          }),
        },
        {
          test: /\.module\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
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
            ]
          }),
        },
        {
          test (filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
          },
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader', options: {
                sourceMap: true,
                '-autoprefixer': true,
              }
              },
              {loader: 'postcss-loader', options: postcssOptions},
              {loader: 'less-loader', options: {sourceMap: true, modifyVars: theme}},
            ]
          }),
        },
        {
          test: /\.module\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
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
            ]
          }),
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
          use: [{loader: 'url-loader', options: {name: '[path][name].[ext]'}}],
        },
      ],
    },

    plugins: [

      new CommonsChunkPlugin({name: 'common', filename: commonName}),

      new ExtractTextPlugin({
        filename: cssFileName,
        disable: false,
        allChunks: true
      }),

      new CaseSensitivePathsPlugin(),

      /*new HtmlWebpackPlugin({
       template: './src/index.html',
       filename: 'index.html'
       }),*/

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
  }

}
