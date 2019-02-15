/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import build from '../src/fnBuild'
import buildDll from '../src/fnBuildDLL'
import shell from 'shelljs'

function similarity(a, b) {
  if (!a || !b || !a.length || !b.length) return 0
  if (a === b) return 1
  let d = leven(a.toLowerCase(), b.toLowerCase())
  let longest = Math.max(a.length, b.length)
  return (longest - d) / longest
}

function assert(distDir, _caseName) {
  const expectDir = path.join(__dirname, 'reference', _caseName)
  const actualFiles = glob.sync('**/*', { cwd: distDir, nodir: true })

  actualFiles.forEach(file => {
    const actualFile = fs.readFileSync(path.join(distDir, file), 'utf-8')
    const expectFile = fs.readFileSync(path.join(expectDir, file), 'utf-8')
    const sim = similarity(actualFile, expectFile)
    expect(sim > 0.7).toBeTruthy()
  })
}

function testCase(args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  const outputPath = path.join(cwd, 'dist')
  shell.rm('-rf', outputPath)
  process.chdir(cwd)
  return build({ cwd, compress: false, ...args })
  //.then(() => assert(outputPath, _case))
}

function assertDll(distDir, _caseName) {
  const fileName = require(path.join(distDir, 'manifest.json')).name

  const expectDir = path.join(__dirname, 'reference', _caseName)
  const fileName2 = require(path.join(expectDir, 'manifest.json')).name

  const actualFile = fs.readFileSync(path.join(distDir, fileName + '.js'), 'utf-8')
  const expectFile = fs.readFileSync(path.join(expectDir, fileName2 + '.js'), 'utf-8')
  const sim = similarity(actualFile, expectFile)
  expect(sim > 0.7).toBeTruthy()
}

function testCaseDll(args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  const outputPath = path.join(cwd, 'dll')
  shell.rm('-rf', outputPath)
  process.chdir(cwd)
  return buildDll({ cwd, compress: false, config: 'webpack.dll.js', ...args })
  //.then(() => assertDll(outputPath, _case))
}

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  delete process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
})

test('support autoprefix', async () => {
  await testCase({ compress: true }, 'build-autoprefix')
})

test('support class-property', async () => {
  await testCase({}, 'build-class-property')
})
test('support common', async () => {
  await testCase({}, 'build-common')
})
test('support css-modules', async () => {
  await testCase({}, 'build-css-modules')
})
test('support custom-path', async () => {
  await testCase({ config: 'webpack.config.path.js' }, 'build-custom-path')
})

test('support custom-plugins', async () => {
  await testCase({ hash: true }, 'build-custom-plugins')
})
test('support custom-rules', async () => {
  await testCase({ hash: false }, 'build-custom-rules')
})

test('support decorator', async () => {
  await testCase({}, 'build-decorator')
})
test('support dynamic import()', async () => {
  await testCase({ hash: true, compress: false }, 'build-dynamic-import')
})
test('support dynamic import() sync', async () => {
  await testCase({ hash: true, compress: false }, 'build-dynamic-import-sync')
})

test('support environment-development', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({}, 'build-env-development')
})
test('support environment-dll', async () => {
  await testCaseDll({ compress: false }, 'build-env-dll')
})
test('support environment-production', async () => {
  await testCase({ compress: true }, 'build-env-production')
})

test('support font', async () => {
  await testCase({}, 'build-font')
})
test('support hash-map', async () => {
  await testCase({ hash: true }, 'build-hash-map')
})

test('support json/json5', async () => {
  await testCase({}, 'build-json')
})
test('support jsx', async () => {
  await testCase({}, 'build-jsx')
})
test('support jsx-multi', async () => {
  await testCase({}, 'build-jsx-multi')
})

test('support less', async () => {
  await testCase({}, 'build-less')
})
test('support lodash', async () => {
  await testCase({ hash: false }, 'build-lodash')
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

test('should build-no-entry', async () => {
  try {
    await testCase({}, 'build-no-entry')
  } catch (e) {
    expect(e.name).toEqual('NoEntry')
    expect(e.message).toEqual('no webpack entry found')
  }
})
