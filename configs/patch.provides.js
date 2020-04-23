/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:27. *
 ***************************************************/
const { ProvidePlugin } = require('webpack')

module.exports = provides => config => {
  if (provides) {
    config.plugin('ProvidePlugin:Custom').use(ProvidePlugin, [provides])
  }
}
