const path = require('path')
const pkg = require('./package.json')

module.exports = async function (context) {
  context.output.path = path.join(process.cwd(), 'dist', pkg.name, pkg.version)
}
