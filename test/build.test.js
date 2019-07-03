/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import shell from 'shelljs'
import webpack from 'webpack'
import fs from 'fs'

async function testCase(args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  const outputPath = path.join(cwd, 'dist')
  shell.rm('-rf', outputPath)
  process.chdir(cwd)
  const config = require('../webpack.entry.config')
  const isNeedPatch = getCustomConfig(cwd, config)

  if (isNeedPatch) config.patch()
  const webpackConfig = config.toConfig()

  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      console.info(stats.toString({ colors: true }))
      err ? reject(err) : resolve()
    })
  })
}

function getCustomConfig(cwd, config) {
  if ('function' === typeof config) {
    return config
  }

  let paths = []

  switch (process.env.NODE_ENV) {
    case 'production':
      paths.push(...['build', 'production', 'prod'])
      break
    case 'development':
      paths.push(...['development', 'develop', 'dev'])
      break
    case 'beta':
      paths.push(...['beta', 'build', 'production', 'prod', 'development', 'develop', 'dev'])
      break
    default:
      paths.push(process.env.NODE_ENV)
      break
  }

  paths.push('config')
  paths = paths.map(name => `webpack.${name}.js`)

  typeof config === 'string' && paths.unshift(config)

  let cc = c => c
  let i = -1
  while (++i < paths.length) {
    let p = paths[i]
    let pp = path.join(cwd, p)
    if (fs.existsSync(pp)) {
      console.info(`${pp}`)
      cc = require(pp)
      break
    }
  }

  if ('function' === typeof cc) {
    return cc(config)
  }

  if ('object' === typeof cc) {
    return cc
  }

  return null
}

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000
  delete process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
})

test('support autoprefix', async () => {
  await testCase({ compress: true }, 'build-autoprefix')
})
test('support cdn', async () => {
  // process.env.ASSET_PATH = 'https://xxxx://xxxx/xxxx'
  await testCase({ compress: false }, 'build-cdn')
})

test('support class-property', async () => {
  await testCase({}, 'build-class-property')
})
test('support common', async () => {
  await testCase({}, 'build-common')
})
test('support css-modules', async () => {
  process.env.ASSET_PATH = 'https://xxxx://xxxx/xxxx'
  await testCase({}, 'build-css-modules')
})
test('build-custom-config-object', async () => {
  await testCase({}, 'build-custom-config-object')
})
test('support custom-path', async () => {
  await testCase({ config: 'webpack.config.path.js' }, 'build-custom-path')
})

test('support custom-plugins', async () => {
  await testCase({ hash: true }, 'build-custom-plugins')
})

test('support decorator', async () => {
  await testCase({}, 'build-decorator')
})
test('support dynamic import()', async () => {
  await testCase({ hash: true, compress: false }, 'build-dynamic-import')
})
test('support dynamic import()-ts', async () => {
  await testCase({ hash: true, compress: false }, 'build-dynamic-import-ts')
})
test('support dynamic import() sync', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({ hash: true, compress: false }, 'build-dynamic-import-sync')
})

test('support environment-development', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({}, 'build-env-development')
})
test('support environment-production', async () => {
  await testCase({ compress: true }, 'build-env-production')
})

test('support font', async () => {
  await testCase({}, 'build-font')
})

test('support gql', async () => {
  await testCase({}, 'build-gql')
})
test('support hash-map', async () => {
  await testCase({ hash: true }, 'build-hash-map')
})
test('support import-plugin', async () => {
  await testCase({ compress: false }, 'build-import-plugin')
})

test('support json/json5', async () => {
  await testCase({}, 'build-json')
})
test('support jsx', async () => {
  await testCase({}, 'build-jsx')
})
test('support jsx-multi', async () => {
  process.env.ASSET_PATH = 'http://s.xxx.c/'
  await testCase({}, 'build-jsx-multi')
})

test('support less', async () => {
  await testCase({}, 'build-less')
})
test('support lodash', async () => {
  await testCase({ hash: false }, 'build-lodash')
})
test('support lodash-ts', async () => {
  await testCase({ hash: false }, 'build-lodash-ts')
})

test('support normal', async () => {
  await testCase({ hash: true }, 'build-normal')
})
test('support source-map', async () => {
  await testCase({}, 'build-source-map')
})
test('support svg', async () => {
  await testCase({}, 'build-svg')
})
test('support target-library', async () => {
  await testCase({}, 'build-target-library')
})

test('support theme', async () => {
  await testCase({}, 'build-theme')
})
test('support typescript', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({}, 'build-typescript')
})
test('support web-worker', async () => {
  await testCase({ hash: true }, 'build-web-worker')
})
test('support web-worker-ts', async () => {
  await testCase({ hash: true }, 'build-web-worker-ts')
})

test('should build-no-entry', async () => {
  try {
    await testCase({}, 'build-no-entry')
  } catch (e) {
    expect(e.name).toEqual('NoEntry')
    expect(e.message).toEqual('entry is an invalid value')
  }
})

test('should build-no-entry-at-example', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({}, 'build-no-entry-at-example')
})
