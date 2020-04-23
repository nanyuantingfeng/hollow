/***************************************************
 * Created by nanyuantingfeng on 2019/12/26 21:07. *
 ***************************************************/
const path = require('path')
const fs = require('fs')

function findIndexFileName(P, name) {
  return fs.readdirSync(path.join(P, name)).find(fn => fn.endsWith('.js') && fn.startsWith(name))
}

function buildRequire(P, name) {
  const fileName = findIndexFileName(P, name)
  if (!fileName) {
    throw new Error(`没有找到 ${name} 下的入口文件`)
  }
  return `require("./${name}/${fileName}");`
}

module.exports = async function concatEntryPlugins(options) {
  const { assets_dist = '.dist/assets', plugins = {}, name } = options

  const P = path.join(process.cwd(), assets_dist)

  if (!fs.existsSync(P)) {
    fs.mkdirSync(P, { recursive: true })
  }

  const content = Object.keys(plugins)
    .map(name => buildRequire(P, name))
    .join('\n')

  fs.writeFileSync(path.join(P, name + '.js'), content, { flag: 'w' })
}
