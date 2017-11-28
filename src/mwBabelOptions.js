/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/
import { tmpdir } from 'os'

export default async function (context, next) {
  context.babelOptions = {
    cacheDirectory: tmpdir(),
    presets: [
      ['babel-preset-env', { modules: false }],
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0',
    ],
    plugins: [
      'babel-plugin-add-module-exports',
      'babel-plugin-external-helpers',
      'babel-plugin-transform-runtime',
      'babel-plugin-transform-regenerator',
      'babel-plugin-transform-undefined-to-void',
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-transform-regenerator',
      'babel-plugin-lodash',
    ],
  }

  const { ENV } = context

  if (ENV.isDevelopment) {
    //context.babelOptions.plugins.push('react-hot-loader/babel')
    context.babelOptions.plugins.push([
      'react-transform', {
        'transforms': [{
          'transform': 'react-transform-hmr',
          'imports': ['react'],
          'locals': ['module']
        }, {
          'transform': 'react-transform-catch-errors',
          'imports': ['react', 'redbox-react']
        }]
      }
    ])
  }

  next()
}
