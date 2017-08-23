/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import build from '../src/build'

function assert (actualDir, _reference) {
  const expectDir = path.join(__dirname, 'reference', _reference)
  const actualFiles = glob.sync('**/*', {cwd: actualDir, nodir: true})

  actualFiles.forEach(file => {
    const actualFile = fs.readFileSync(path.join(actualDir, file), 'utf-8')
    const expectFile = fs.readFileSync(path.join(expectDir, file), 'utf-8')
    expect(actualFile).toEqual(expectFile)
  })
}

function testCase (args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  const outputPath = path.join(cwd, 'dist')
  process.chdir(cwd)
  return build({cwd, compress: false, ...args})
    .then(() => {assert(outputPath, _case)})
    .catch(e => {throw e})
}

describe('test', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

  it('support normally', async () => {
    await testCase({hash: true}, 'build-normal')
  })
  it('support class property', async () => {
    await testCase({}, 'build-class-property')
  })
  it('support less', async () => {
    await testCase({}, 'build-less')
  })
  it('support css modules', async () => {
    await testCase({}, 'build-css-modules')
  })
  it('support add-module-exports', async () => {
    await testCase({}, 'build-add-module-exports')
  })
  it('support js-lazy', async () => {
    await testCase({}, 'build-js-lazy')
  })
  it('support jsx', async () => {
    await testCase({}, 'build-jsx')
  })
  it('support json', async () => {
    await testCase({}, 'build-json')
  })
  it('support node builtins', async () => {
    await testCase({}, 'build-node-builtins')
  })
  it('support mergeCustomConfig plugins', async () => {
    await testCase({hash: true}, 'build-mergeCustomConfig-plugins')
  })
  it('support mergeCustomConfig environment production', async () => {
    await testCase({compress: true}, 'build-mergeCustomConfig-environment-production')
  })
  it('support mergeCustomConfig environment development', async () => {
    process.env.NODE_ENV = 'development'
    await testCase({}, 'build-mergeCustomConfig-environment-development')
  })
  it('support config', async () => {
    await testCase({config: 'webpack.config.path.js'}, 'build-mergeCustomConfig-path')
  })
  it('support hash map', async () => {
    await testCase({hash: true}, 'build-hash-map')
  })
  it('support i18n', async () => {
    await testCase({}, 'build-i18n')
  })
  it('support decorator', async () => {
    await testCase({}, 'build-decorator')
  })
  it('support es3', async () => {
    await testCase({}, 'build-es3')
  })
  it('support typescript', async () => {
    await testCase({}, 'build-typescript')
  })
  it('support theme', async () => {
    await testCase({}, 'build-theme')
  })
  it('support font', async () => {
    await testCase({}, 'build-font')
  })
  it('support autoprefix', async () => {
    await testCase({}, 'build-autoprefix')
  })
  it('support common', async () => {
    await testCase({}, 'build-common')
  })
  it('support svg', async () => {
    await testCase({}, 'build-svg')
  })
  it('should throw error', async () => {
    await testCase({}, 'build-no-entry')
      .catch((e) => {
        expect(e.name).toEqual('NoEntry')
        expect(e.message).toEqual('no webpack entry found')
      })
  })
})
