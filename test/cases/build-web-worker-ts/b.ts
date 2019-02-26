/**************************************************
 * Created by nanyuantingfeng on 28/11/2017 11:08.
 **************************************************/

export function fa() {
  return 9
}

export function fb() {
  return import('./c').then(({ fc }) => fc())
}
