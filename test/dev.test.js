/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import server from '../src/server'

function testCase (args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  return server({cwd, compress: true, ...args})
}

testCase({hash: false}, 'build-normal')
