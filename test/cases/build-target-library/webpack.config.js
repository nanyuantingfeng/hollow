/**************************************************
 * Created by nanyuantingfeng on 2019-04-11 12:10.
 **************************************************/

module.exports = function(config) {
  config.target('web')
  config.output
    .publicPath('http://127.0.0.1:9933/')
    .libraryTarget('umd')
    .library('DEMO')
  return config
}
