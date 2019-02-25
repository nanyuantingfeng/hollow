/**************************************************
 * Created by nanyuantingfeng on 2019-02-25 17:11.
 **************************************************/

module.exports = function(context) {
  const { babelOptions } = context

 // context.enableHappyPack = false

  babelOptions.plugins.push([
    'babel-plugin-import',
    {
      libraryName: 'antd',
      style: true,
      libraryDirectory: 'es'
    }
  ])
}
