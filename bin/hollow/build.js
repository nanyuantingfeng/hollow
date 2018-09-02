/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:52.
 **************************************************/
var fn = require('../../lib/fnBuild').default

exports.command = 'build'

exports.desc = 'build current project'

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
    .option('compress', {
      type: 'boolean',
      description: 'build files with compress',
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
      description: 'webpack.build.js file path',
      default: 'webpack.build.js',
    })
    .option('verbose', {
      type: 'boolean',
      description: 'verbose info level',
    })
}

exports.handler = function (argv) {

  var exit = () => {process.exit(0)}

  if (argv.watch) {
    fn(argv)
  } else {
    fn(argv).then(exit).catch(exit)
  }

}


