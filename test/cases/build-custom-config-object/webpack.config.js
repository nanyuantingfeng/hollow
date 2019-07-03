module.exports = function(config) {
  config.target('web')
  config.output.clear()
  config.output.libraryTarget('umd').library('XCCCC')
}
