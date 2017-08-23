/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:52.
 **************************************************/
var devServer = require('../../lib/devServer')

exports.command = 'dev'

exports.desc = 'start development server for current project'

exports.builder = function (yargs) {
  return yargs
    .option('hash', {
      type: 'boolean',
      description: 'build files with hash name',
    })
    .option('watch', {
      type: 'boolean',
      description: 'watch files change',
    })
    .option('devtool', {
      type: 'string',
      description: 'source map type',
    })
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'webpack.config.js file path',
    })
    .option('verbose', {
      type: 'boolean',
      description: 'verbose info level',
    })
}

exports.handler = function (argv) {

  var exit = () => {process.exit(0)}

  if (argv.watch) {
    devServer(argv)
  } else {
    devServer(argv).then(exit).catch(exit)
  }
}
