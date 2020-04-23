/***************************************************
 * Created by nanyuantingfeng on 2020/2/27 14:06. *
 ***************************************************/

const path = require('path')
const { execSync } = require('child_process')

module.exports = pL => {
  const port = execSync(`${process.execPath} ${path.resolve(__dirname, './find-free-port.sh.js')} ${pL}`)
    .toString()
    .trim()
  return Number(port)
}
