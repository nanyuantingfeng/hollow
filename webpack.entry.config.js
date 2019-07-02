const path = require('path')
const config = require('./configs')

config.output.path(path.resolve(process.cwd(), 'build')).filename('[name].[hash:8].js')

module.exports = config
