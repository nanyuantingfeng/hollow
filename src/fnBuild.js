/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import startBuild from './buildCore'
import createBuildContext from './createBuildContext'

export default function(args) {
  return createBuildContext(args)
    .then(startBuild)
    .catch(e => {
      // throw e
      console.error(e)
    })
}
