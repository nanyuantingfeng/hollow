/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import startBuild from './buildCore';
import createBuildDLLContext from './createBuildDLLContext';

export default function (args) {
  return createBuildDLLContext(args)
    .then(startBuild)
    .catch(e => {
      //throw e
      console.error(e);
    });
}
