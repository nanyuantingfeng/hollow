/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import startBuild from './buildCore'
import createBuildContext from './createBuildContext'

export default function fnBuild(args: any) {
  return createBuildContext(args)
    .then(startBuild)
    .catch((e: Error) => {
      // throw e
      console.error(e)
    })
}
