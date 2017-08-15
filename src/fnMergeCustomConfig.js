/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:44.
 **************************************************/
import { existsSync } from 'fs'

export default function (webpackConfig, customConfigPath) {
  if (!existsSync(customConfigPath)) {
    return webpackConfig
  }

  let customConfig = require(customConfigPath)

  if (typeof customConfig === 'function') {
    return customConfig(webpackConfig, ...[...arguments].slice(2))
  }

  throw new Error(`Return of ${customConfigPath} must be a function.`)
}
