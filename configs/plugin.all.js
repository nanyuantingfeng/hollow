/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:36. *
 ***************************************************/
module.exports = function(options) {
  const { files, sdks, entry, externals, cdn } = options

  return config => {
    require('./plugin.files')(files)(config)
    require('./plugin.entries')(entry)(config)
    require('./plugin.htmls')(entry, sdks, files, externals)(config)
    require('./plugin.cnd')(cdn)(config)
    require('./plugin.externals')(files, externals)(config)
  }
}
