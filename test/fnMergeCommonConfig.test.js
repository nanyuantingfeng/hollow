/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import fnMergeCustomConfig from '../src/fnMergeCustomConfig'
import expect from 'expect'

describe('lib/mergeCustomConfig', () => {

  it('should not replace if no config', () => {
    const baseDir = path.join(__dirname, 'fixtures/not-found')
    const customConfigPath = path.join(baseDir, 'webpack.config.js')
    expect(fnMergeCustomConfig({a: 1}, customConfigPath)).toEqual({a: 1})
  })

  it('should replace if function', () => {
    const baseDir = path.join(__dirname, 'fixtures/mergeCustomConfig-function')
    const customConfigPath = path.join(baseDir, 'webpack.config.js')
    expect(fnMergeCustomConfig({a: 1}, customConfigPath)).toEqual({a: 'p'})
    expect(fnMergeCustomConfig({a: 1}, customConfigPath, 'development')).toEqual({a: 'd'})
  })

  it('should throw error if not function', () => {
    const baseDir = path.join(__dirname, 'fixtures/mergeCustomConfig-error')
    const customConfigPath = path.join(baseDir, 'webpack.config.js')
    expect(() => {
      fnMergeCustomConfig({a: 1}, customConfigPath)
    }).toThrow()
  })
})
