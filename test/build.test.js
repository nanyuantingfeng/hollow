/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import build from '../src/build'
import expect from 'expect'

function assert (actualDir, _reference) {
  const expectDir = path.join(__dirname, 'reference', _reference)
  const actualFiles = glob.sync('**/*', {cwd: actualDir, nodir: true})

  actualFiles.forEach(file => {
    const actualFile = fs.readFileSync(path.join(actualDir, file), 'utf-8')
    const expectFile = fs.readFileSync(path.join(expectDir, file), 'utf-8')
    expect(actualFile).toEqual(expectFile)
  })
}

function fnTestCase (args, _case) {
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
    return fnTestCase({hash: true}, 'build-normal')
  })
  it('should support class property', () => {
    return fnTestCase({}, 'build-class-property')
  })
  it('should support less', () => {
    return fnTestCase({}, 'build-less')
  })
  it('should support css modules', () => {
    return fnTestCase({}, 'build-css-modules')
  })
  it('should support add-module-exports', () => {
    return fnTestCase({}, 'build-add-module-exports')
  })
  it('should support js-lazy', () => {
    return fnTestCase({}, 'build-js-lazy')
  })
  it('should support jsx', () => {
    return fnTestCase({}, 'build-jsx')
  })
  it('should support json', () => {
    return fnTestCase({}, 'build-json')
  })
  it('should support node builtins', () => {
    return fnTestCase({}, 'build-node-builtins')
  })
  it('should support mergeCustomConfig plugins', () => {
    return fnTestCase({hash: true}, 'build-mergeCustomConfig-plugins')
  })
  it('should support mergeCustomConfig environment production', () => {
    return fnTestCase({compress: true}, 'build-mergeCustomConfig-environment-production')
  })
  it('should support mergeCustomConfig environment development', () => {
    process.env.NODE_ENV = 'development'
    return fnTestCase({}, 'build-mergeCustomConfig-environment-development')
  })
  it('should support config', () => {
    return fnTestCase({config: 'webpack.config.path.js'}, 'build-mergeCustomConfig-path')
  })
  it('should support hash map', () => {
    return fnTestCase({hash: true}, 'build-hash-map')
  })
  it('should support i18n', () => {
    return fnTestCase({}, 'build-i18n')
  })
  it('should support decorator', () => {
    return fnTestCase({}, 'build-decorator')
  })
  it('should support es3', () => {
    return fnTestCase({}, 'build-es3')
  })
  it('should support typescript', () => {
    return fnTestCase({}, 'build-typescript')
  })
  it('should support theme', () => {
    return fnTestCase({}, 'build-theme')
  })
  it('should support font', () => {
    return fnTestCase({}, 'build-font')
  })
  it('should support autoprefix', () => {
    return fnTestCase({}, 'build-autoprefix')
  })
  it('should support common', () => {
    return fnTestCase({}, 'build-common')
  })
  it('should support svg', () => {
    return fnTestCase({}, 'build-svg')
  })
  it('should throw error', () => {
    return fnTestCase({}, 'build-no-entry')
      .catch((e) => {
        expect(e.name).toEqual('NoEntry')
        expect(e.message).toEqual('no webpack entry found')
      })
  })

})
