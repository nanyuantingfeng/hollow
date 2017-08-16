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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

  it('should build normally', () => {
    return testCase({hash: true}, 'build-normal')
  })
  it('should support class property', () => {
    return testCase({}, 'build-class-property')
  })
  it('should support less', () => {
    return testCase({}, 'build-less')
  })
  it('should support css modules', () => {
    return testCase({}, 'build-css-modules')
  })
  it('should support add-module-exports', () => {
    return testCase({}, 'build-add-module-exports')
  })
  it('should support js-lazy', () => {
    return testCase({}, 'build-js-lazy')
  })
  it('should support jsx', () => {
    return testCase({}, 'build-jsx')
  })
  it('should support json', () => {
    return testCase({}, 'build-json')
  })
  it('should support node builtins', () => {
    return testCase({}, 'build-node-builtins')
  })
  it('should support mergeCustomConfig plugins', () => {
    return testCase({hash: true}, 'build-mergeCustomConfig-plugins')
  })
  it('should support mergeCustomConfig environment production', () => {
    return testCase({compress: true}, 'build-mergeCustomConfig-environment-production')
  })
  it('should support mergeCustomConfig environment development', () => {
    process.env.NODE_ENV = 'development'
    return testCase({}, 'build-mergeCustomConfig-environment-development')
  })
  it('should support config', () => {
    return testCase({config: 'webpack.config.path.js'}, 'build-mergeCustomConfig-path')
  })
  it('should support hash map', () => {
    return testCase({hash: true}, 'build-hash-map')
  })
  it('should support i18n', () => {
    return testCase({}, 'build-i18n')
  })
  it('should support decorator', () => {
    return testCase({}, 'build-decorator')
  })
  it('should support es3', () => {
    return testCase({}, 'build-es3')
  })
  it('should support typescript', () => {
    return testCase({}, 'build-typescript')
  })
  it('should support theme', () => {
    return testCase({}, 'build-theme')
  })
  it('should support font', () => {
    return testCase({}, 'build-font')
  })
  it('should support autoprefix', () => {
    return testCase({}, 'build-autoprefix')
  })
  it('should support common', () => {
    return testCase({}, 'build-common')
  })
  it('should support svg', () => {
    return testCase({}, 'build-svg')
  })
  it('should throw error', () => {
    return testCase({}, 'build-no-entry')
      .catch((e) => {
        expect(e.name).toEqual('NoEntry')
        expect(e.message).toEqual('no webpack entry found')
      })
  })

})
