/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/

export default async function(context, next) {
  const commonPresets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '39',
          edge: '12',
          ie: '10',
          firefox: '33',
          safari: '9',
          node: '4',
          ios: '9'
        },
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3
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

  const {
    optimizeDynamicImport = context.ENV.isDevelopment,
    optimizeLodash = true,
    useBabelrc = false,
    importPluginOptions
  } = context

  if (useBabelrc) {
    context.babelOptions.babelrc = true
  }

  if (optimizeDynamicImport) {
    commonPlugins.push('babel-plugin-dynamic-import-node')
  }

  if (optimizeLodash) {
    commonPlugins.push('babel-plugin-lodash')
  }

  if (importPluginOptions) {
    commonPlugins.push(...importPluginOptions.map(o => ['babel-plugin-import', o]))
  }
}
