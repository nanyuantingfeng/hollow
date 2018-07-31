/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 16:24.
 **************************************************/
export default function() {
  let resolve = void 0;
  let reject = void 0;
  let promise = new Promise((rs, rj) => {
    resolve = rs;
    reject = rj;
  });
  return { promise, resolve, reject };
}
