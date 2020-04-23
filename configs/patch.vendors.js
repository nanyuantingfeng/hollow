/***************************************************
 * Created by nanyuantingfeng on 2019-08-13 12:12. *
 ***************************************************/
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const deepmerge = require('deepmerge')

const resolve = (moduleName, fileName) =>
  require.resolve(`${moduleName}${path.sep}${fileName}`, { paths: [process.cwd()] })

const getFileName = (regx, cwd) => {
  const files = glob.sync(regx, { cwd })

  if (!Array.isArray(files) || files.length === 0) {
    process.stdout.write(`没有找到文件: ${regx}`)
  }

  if (files.length > 1) {
    process.stdout.write(`匹配到多个文件: ${regx} | ${files.join(' ')}`)
  }

  return files[0]
}

const getPathName = moduleName => {
  const aP = resolve(moduleName, 'package.json')
  const aPn = path.dirname(aP)
  return path.relative(process.cwd(), aPn)
}

const getVendors = regx => moduleNames =>
  moduleNames.map(moduleName => {
    const pathDir = getPathName(moduleName)
    const fileName = getFileName(regx, pathDir)
    return { pathDir, fileName }
  })

const getExternals = moduleNames => {
  let oo = {}
  moduleNames.forEach(moduleName => {
    const alias = resolve(moduleName, 'alias.js')
    if (fs.existsSync(alias)) {
      oo = { ...oo, ...require(alias) }
    }
  })
  return oo
}

const parseOne = regx => moduleNames => {
  const files = {}
  const sdks = []
  const externals = {}

  if (!regx || !moduleNames || !moduleNames.length) {
    return [files, sdks, externals]
  }

  const vendors = getVendors(regx)(moduleNames)

  vendors.forEach(({ fileName, pathDir }) => {
    files[fileName] = pathDir + path.sep + fileName
    sdks.push(fileName)
  })

  Object.assign(externals, getExternals(moduleNames))

  return [files, sdks, externals]
}

module.exports = vendors => {
  vendors = vendors || []

  let files = {}
  let sdks = []
  let externals = {}

  for (let j = 0; j < vendors.length - 1; j += 2) {
    const nn = parseOne(vendors[j])(vendors[j + 1])
    files = deepmerge(files, nn[0])
    sdks = deepmerge(sdks, nn[1])
    externals = deepmerge(externals, nn[2])
  }

  return [files, sdks, externals]
}
