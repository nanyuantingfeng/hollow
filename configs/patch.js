/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:36. *
 ***************************************************/
module.exports = function(options) {
  const { files, sdks, entry, externals, cdn } = options

  return config => {
    require('./patch.files')(files)(config)
    const entries = require('./patch.entries')(entry)(config)
    require('./patch.htmls')(entries, sdks, files, externals)(config)
    require('./patch.cnd')(cdn)(config)
    require('./patch.externals')(files, externals)(config)
  }
}
