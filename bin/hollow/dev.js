/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:52.
 **************************************************/
var fn = require('../../lib/fnDevServer')

exports.command = 'dev'

exports.desc = 'start development server for current project'

exports.builder = function (yargs) {
  return yargs
    .option('hash', {
      type: 'boolean',
      description: 'build files with hash name',
    })
    .option('public-path', {
      type: 'string',
      description: 'public path',
    })
    .option('port', {
      type: 'number',
      alias: 'p',
      description: 'build files with hash name',
    })
    .option('compress', {
      type: 'boolean',
      description: 'build files with compress',
    })
    .option('watch', {
      type: 'boolean',
      description: 'watch files change',
      default: true
    })
    .option('devtool', {
      type: 'string',
      description: 'source map type',
    })
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'webpack.config.js file path',
      default: 'webpack.config.js',
    })
    .option('verbose', {
      type: 'boolean',
      description: 'verbose info level',
    })
}

exports.handler = function (argv) {

  var exit = () => {process.exit(0)}

  fn(argv).catch(exit)
}
