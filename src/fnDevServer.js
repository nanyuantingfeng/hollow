/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import { startDevServer } from './devServerCore'
import createDevServerContext from './createDevServerContext'

export default function (args) {
  return createDevServerContext(args)
    .then(startDevServer)
    .catch(e => {
      //throw e
      console.error(e)
    })
}
