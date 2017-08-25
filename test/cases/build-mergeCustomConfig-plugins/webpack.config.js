module.exports = async function (context, next) {
  let {webpackConfig} = context
  webpackConfig.output.filename = '[name].js'
}
