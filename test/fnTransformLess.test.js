/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import fs from 'fs'
import expect from 'expect'
import fnTransformLess from '../src/fnTransformLess'

const cwd = process.cwd()

describe('lib/transformLess', () => {
  it('should build normally', () => {
    return fnTransformLess('./test/fixtures/transformLess/a.less', {cwd})
      .then(result => {
        const expected = fs.readFileSync(path.join(cwd, './test/expect/transformLess/a.css'), 'utf-8')
        expect(result).toEqual(expected)
      })
  })
})
