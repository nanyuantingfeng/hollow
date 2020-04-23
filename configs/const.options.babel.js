/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 16:48. *
 ***************************************************/
const babelOptions = {
  cacheDirectory: true,
  babelrc: false,
  highlightCode: true,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
        // useBuiltIns: 'usage',
        // corejs: 3
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-external-helpers',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-async-generator-functions',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
    // 'babel-plugin-lodash'
  ]
}

// The compiled file is too large, causing entry memory overflow
const { isDevelopment, isProduction } = require('./const.env')

// if (isDevelopment) {
//  babelOptions.plugins.push('babel-plugin-dynamic-import-node')
// }

module.exports.getOptions = function() {
  return babelOptions
}

module.exports.setImports = function(imports) {
  imports.forEach(node => {
    babelOptions.plugins.push(['babel-plugin-import', node, node.libraryName])
  })
}

module.exports.setBrowsers = function(browserslist) {
  babelOptions.presets[0][1].targets = { browsers: browserslist }
}
