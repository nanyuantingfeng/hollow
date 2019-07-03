const path = require('path')

module.exports = function(config) {
  config.output.path(path.join(process.cwd(), './dist/xbuild'))
}
