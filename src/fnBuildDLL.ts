/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import startBuild from './buildCore'
import createBuildDLLContext from './createBuildDLLContext'

export default function fnBuildDLL(args: any) {
  return createBuildDLLContext(args)
    .then(startBuild)
    .catch(e => {
      //throw e
      console.error(e)
    })
}
