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

it('support add-module-exports', async () => {
  await testCase({}, 'build-add-module-exports')
})
it('support autoprefix', async () => {
  await testCase({ compress: false }, 'build-autoprefix')
})

it('support class-property', async () => {
  await testCase({}, 'build-class-property')
})
it('support common', async () => {
  await testCase({}, 'build-common')
})
it('support css-modules', async () => {
  await testCase({}, 'build-css-modules')
})
it('support custom-path', async () => {
  await testCase({ config: 'webpack.config.path.js' }, 'build-custom-path')
})
it('support custom-plugins', async () => {
  await testCase({ hash: true }, 'build-custom-plugins')
})
it('support custom-rules', async () => {
  await testCase({ hash: false }, 'build-custom-rules')
})

it('support decorator', async () => {
  await testCase({}, 'build-decorator')
})
it('support dynamic import()', async () => {
  await testCase({ hash: true, compress: false }, 'build-dynamic-import')
})

it('support environment-development', async () => {
  process.env.NODE_ENV = 'development'
  await testCase({}, 'build-env-development')
})
it('support environment-dll', async () => {
  await testCaseDll({ compress: true }, 'build-env-dll')
})
it('support environment-production', async () => {
  await testCase({ compress: true }, 'build-env-production')
})
it('support es3', async () => {
  await testCase({}, 'build-es3')
})

it('support font', async () => {
  await testCase({}, 'build-font')
})
it('support hash-map', async () => {
  await testCase({ hash: true }, 'build-hash-map')
})
it('support js-lazy', async () => {
  await testCase({ compress: false }, 'build-js-lazy')
})

it('support json', async () => {
  await testCase({}, 'build-json')
})
it('support jsx', async () => {
  await testCase({}, 'build-jsx')
})
it('support jsx-multi', async () => {
  await testCase({}, 'build-jsx-multi')
})

it('support less', async () => {
  await testCase({}, 'build-less')
})
it('support lodash', async () => {
  await testCase({ hash: false }, 'build-lodash')
})

it('support normal', async () => {
  await testCase({ hash: true }, 'build-normal')
})
it('support source-map', async () => {
  await testCase({}, 'build-source-map')
})
it('support svg', async () => {
  await testCase({}, 'build-svg')
})

it('support theme', async () => {
  await testCase({}, 'build-theme')
})
it('support typescript', async () => {
  await testCase({}, 'build-typescript')
})
it('support web-worker', async () => {
  await testCase({ hash: true }, 'build-web-worker')
})

it('should build-no-entry', async () => {
  await testCase({}, 'build-no-entry')
    .catch((e) => {
      expect(e.name).toEqual('NoEntry')
      expect(e.message).toEqual('no webpack entry found')
      return Promise.resolve()
    })
})
 
