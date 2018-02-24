/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/

export default async function (context, next) {

  const commonPresets = [
    ['env', {
      'targets': { 'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 10'] },
      'modules': false,
      'useBuiltIns': true,
    }],
    'react',
  ]
  const commonPlugins = [
    'external-helpers',
    'add-module-exports',
    'syntax-export-extensions',
    'syntax-dynamic-import',
    'transform-object-rest-spread',
    'transform-runtime',
    'transform-regenerator',
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-function-bind',
    'lodash',
  ]

  context.babelOptions = {
    cacheDirectory: true,
    presets: commonPresets,
    plugins: commonPlugins,
    env: {
      development: {
        plugins: [
          ['react-transform',
            {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module']
              }, {
                'transform': 'react-transform-catch-errors',
                'imports': ['react', 'redbox-react']
              }]
            }
          ]
        ]
      }
    }
  }

  next()
}
