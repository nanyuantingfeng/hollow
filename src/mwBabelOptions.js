/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/
import { tmpdir } from 'os'

export default async function (context, next) {

  const commonPresets = [
    ['env', {
      targets: { browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'] },
      modules: false,
      useBuiltIns: true,
      loose: false,
    }],
    'react',
  ]

  const commonPlugins = [
    'add-module-exports',
    'external-helpers',
    'transform-runtime',
    'transform-regenerator',
    'transform-undefined-to-void',
    'transform-decorators-legacy',
    'transform-regenerator',
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-function-bind',
    'syntax-export-extensions',
    'lodash',
  ]

  context.babelOptions = {
    cacheDirectory: tmpdir(),

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
