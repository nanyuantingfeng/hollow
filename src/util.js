/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 10:21.
 **************************************************/
import notifier from 'node-notifier'
import chalk from 'chalk'
import fs from 'fs'

export {
  notifier,
  chalk,
}

export function fnProgressHandler (percent, msg1, msg2) {
  let stream = process.stdout
  if (stream.isTTY && percent < .70) {
    stream.cursorTo(0)
    stream.write(`\u231B  ${chalk.magenta(msg2)} ${msg1}`)
    stream.clearLine(1)
  } else if (percent >= 1) {
    console.log(chalk.green('\nwebpack: bundle build is now finished'))
  }
}


export function fnCheckWebpackConfig (webpackConfig) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    let e = new Error('no webpack entry found')
    e.name = 'NoEntry'
    throw e
  }
}

export function getValueByPath (path) {
  return !fs.existsSync(path) ? {} : require(path)
}
