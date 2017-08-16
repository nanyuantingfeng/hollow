/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:03.
 **************************************************/
import { tmpdir } from 'os'

export default async function (context, next) {
  context.babelOptions = {
    cacheDirectory: tmpdir(),
    presets: [
      [require.resolve('babel-preset-env'), {modules: false}],
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-external-helpers'),
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-regenerator'),
      require.resolve('babel-plugin-transform-undefined-to-void'),
      require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('babel-plugin-transform-regenerator'),
    ],
  }

  next()
}
