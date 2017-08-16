/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import build from '../src/build'
import expect from 'expect'

function assert (actualDir, _expect) {
  const expectDir = path.join(__dirname, 'expect', _expect)
  const actualFiles = glob.sync('**/*', {cwd: actualDir, nodir: true})

  actualFiles.forEach(file => {
    const actualFile = fs.readFileSync(path.join(actualDir, file), 'utf-8')
    const expectFile = fs.readFileSync(path.join(expectDir, file), 'utf-8')
    expect(actualFile).toEqual(expectFile)
  })
}

function testBuild (args, fixture) {
  const cwd = path.join(__dirname, 'fixtures', fixture)
  const outputPath = path.join(cwd, 'dist')
  process.chdir(cwd)

  return build({cwd, compress: false, ...args})
    .then(() => {
      assert(outputPath, fixture)
    })
    .catch(e => {throw e})
}

describe('test', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

  it('should build normally', () => {
    return testBuild({hash: true}, 'build-normal')
  })
  it('should support class property', () => {
    return testBuild({}, 'build-class-property')
  })
  it('should support less', () => {
    return testBuild({}, 'build-less')
  })
  it('should support css modules', () => {
    return testBuild({}, 'build-css-modules')
  })
  it('should support add-module-exports', () => {
    return testBuild({}, 'build-add-module-exports')
  })
  it('should support js-lazy', () => {
    return testBuild({}, 'build-js-lazy')
  })
  it('should support jsx', () => {
    return testBuild({}, 'build-jsx')
  })
  it('should support json', () => {
    return testBuild({}, 'build-json')
  })
  it('should support node builtins', () => {
    return testBuild({}, 'build-node-builtins')
  })
  it('should support mergeCustomConfig plugins', () => {
    return testBuild({hash: true}, 'build-mergeCustomConfig-plugins')
  })
  it('should support mergeCustomConfig environment production', () => {
    return testBuild({compress: true}, 'build-mergeCustomConfig-environment-production')
  })
  it('should support mergeCustomConfig environment development', () => {
    process.env.NODE_ENV = 'development'
    return testBuild({}, 'build-mergeCustomConfig-environment-development')
  })
  it('should support config', () => {
    return testBuild({config: 'webpack.config.path.js'}, 'build-mergeCustomConfig-path')
  })
  it('should support hash map', () => {
    return testBuild({hash: true}, 'build-hash-map')
  })
  it('should support i18n', () => {
    return testBuild({}, 'build-i18n')
  })
  it('should support decorator', () => {
    return testBuild({}, 'build-decorator')
  })
  it('should support es3', () => {
    return testBuild({}, 'build-es3')
  })
  it('should support typescript', () => {
    return testBuild({}, 'build-typescript')
  })
  it('should support theme', () => {
    return testBuild({}, 'build-theme')
  })
  it('should support font', () => {
    return testBuild({}, 'build-font')
  })
  it('should support autoprefix', () => {
    return testBuild({}, 'build-autoprefix')
  })
  it('should support common', () => {
    return testBuild({}, 'build-common')
  })
  it('should support svg', () => {
    return testBuild({}, 'build-svg')
  })
  it('should throw error', () => {
    return testBuild({}, 'build-no-entry')
      .catch((e) => {
        expect(e.name).toEqual('NoEntry')
        expect(e.message).toEqual('no webpack entry found')
      })
  })

})
