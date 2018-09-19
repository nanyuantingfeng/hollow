/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/

export default async function(context, next) {
  const commonPresets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'IE >= 11']
        },
        modules: false,
        useBuiltIns: false
      }
    ],
    '@babel/preset-react'
  ]

  const commonPlugins = [
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
  ]

  context.babelOptions = {
    cacheDirectory: true,
    babelrc: false,
    highlightCode: true,
    presets: commonPresets,
    plugins: commonPlugins
  }

  next()

  const { optimizeDynamicImport = false, optimizeLodash = true } = context

  if (optimizeDynamicImport) {
    commonPlugins.push('babel-plugin-dynamic-import-node-sync')
  }

  if (optimizeLodash) {
    commonPlugins.push('babel-plugin-lodash')
  }
}
