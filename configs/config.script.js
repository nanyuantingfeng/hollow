/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:33. *
 ***************************************************/
module.exports = function(config) {
  const babelOptions = require('./const.options.babel').getOptions()
  const tsOptions = require('./const.options.ts').getOptions()

  const useScriptRule = config => (lang, test) => {
    const baseRule = config.module
      .rule(lang)
      .test(test)
      .exclude.add(/node_modules/)
      .add(/assets(-dev)?/)
      .end()

    const workersRule = baseRule.oneOf('workers').resource(/worker\.[tj]sx?$/)
    const normalRule = baseRule.oneOf('normal')

    applyRules(workersRule, true)
    applyRules(normalRule, false)

    function applyRules(rule, isWorker) {
      if (isWorker) {
        rule.use('workerize').loader('workerize-loader')
      }

      rule
        .use('babel')
        .loader('babel-loader')
        .options(babelOptions)

      if (lang === 'tsx') {
        rule
          .use('ts')
          .loader('ts-loader')
          .options(tsOptions)
      }
    }
  }

  useScriptRule(config)('jsx', /\.jsx?$/)
  useScriptRule(config)('tsx', /\.tsx?$/)

  config.module
    .rule('mjsx')
    .test(/\.mjsx?$/)
    .type('javascript/auto')
    .end()
}
