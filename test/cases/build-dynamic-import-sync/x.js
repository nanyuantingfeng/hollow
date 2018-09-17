/**************************************************
 * Created by nanyuantingfeng on 09/01/2018 13:04.
 **************************************************/

import './x.less';

function demoFunction(demo) {
  return function (dd) {
    return demo + dd;
  };
}

export default demoFunction;
