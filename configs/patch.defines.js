/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:27. *
 ***************************************************/
const { DefinePlugin } = require('webpack')

module.exports = function(defines) {
  return config => {
    config.plugin('DefinePlugin:Custom').use(DefinePlugin, [defines])
  }
}
