/**************************************************
 * Created by nanyuantingfeng on 29/10/2017 14:21.
 **************************************************/
var fn = require('../../lib/fnBuildDLL')

exports.command = 'dll'

exports.desc = 'build current project `s dll'

exports.builder = function (yargs) {
  return yargs
    .option('hash', {
      type: 'boolean',
      description: 'build files with hash name',
    })
    .option('output-path', {
      type: 'string',
      alias: 'o',
      description: 'output path',
    })
    .option('public-path', {
      type: 'string',
      description: 'public path',
    })
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'webpack.config.js file path',
      default: 'webpack.dll.js',
    })
    .option('compress', {
      type: 'boolean',
      description: 'build files with compress',
    })
    .option('devtool', {
      type: 'string',
      description: 'source map type',
    })
    .option('verbose', {
      type: 'boolean',
      description: 'verbose info level',
    })
}

exports.handler = function (argv) {

  var exit = () => {process.exit(0)}

  fn(argv).then(exit).catch(exit)

}
