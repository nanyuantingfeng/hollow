/**************************************************
 * Created by nanyuantingfeng on 06/03/2017 18:35.
 **************************************************/
var program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .option('-o, --output-path <path>', 'output path')
  .option('-w, --watch [delay]', 'watch file changes and rebuild')
  .option('--hash', 'build with hash and output map.json')
  .option('--publicPath <publicPath>', 'publicPath for webpack')
  .option('--devtool <devtool>', 'sourcemap generate method, default is null')
  .option('--config <path>', 'custom config path, default is webpack.config.js')
  .option('--no-compress', 'build without compress')
  .option('--json', 'running webpack with --json, ex. result.json')
  .option('--verbose', 'run with more logging messages.')
  .parse(process.argv)

program.cwd = process.cwd()

if (program.watch) {
  require('../lib/build').default(program)
} else {
  require('../lib/build').default(program, () => {
    process.exit(0)
  })
}
