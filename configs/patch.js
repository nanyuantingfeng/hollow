/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:36. *
 ***************************************************/
const deepmerge = require('deepmerge')

module.exports = function(options) {
  const {
    vendors,
    files: files0,
    sdks: sdks0 = {},
    entry,
    externals: externals0,
    defines,
    provides,
    htmls,
    noParse,
    imports,
    browserslist,
    compilertarget
  } = options

  return config => {
    const [files1, sdks1, externals1] = require('./patch.vendors')(vendors)
    const files = deepmerge(files0, files1)
    const externals = deepmerge(externals0, externals1)
    const sdks = deepmerge(sdks0, { ['*']: sdks1 })

    require('./patch.files')(files)(config)

    const entries = require('./patch.entries')(entry)(config)

    if (entries !== false) {
      // 有可能不会使用 patch.entry , `library`
      // 此时不需要生成 html 入口
      require('./patch.htmls')(entries, sdks, htmls)(config)
    }

    // other api
    require('./patch.browsers')(browserslist, compilertarget)(config)
    require('./patch.externals')(externals)(config)
    require('./patch.defines')(defines)(config)
    require('./patch.provides')(provides)(config)
    require('./patch.noparse')(noParse)(config)
    require('./patch.imports')(imports)(config)
  }
}
