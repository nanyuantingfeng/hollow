/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import devServer from '../src/fnDevServer'

function testCase (args, _case) {
  const cwd = path.join(__dirname, 'cases', _case)
  return devServer({cwd, compress: true, ...args})
}

testCase({hash: false}, 'build-normal')
