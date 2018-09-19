/**************************************************
 * Created by nanyuantingfeng on 2018/9/19 15:58.
 **************************************************/

const mapper = {
  'lodash.merge': 'lodash/merge',
  'lodash.isequal': 'lodash/isEqual',
  'lodash.throttle': 'lodash/throttle',
  'lodash.debounce': 'lodash/debounce',
  'lodash.keys': 'lodash/keys',
  'lodash.isarguments': 'lodash/isArguments',
  'lodash._getnative': 'lodash/_getNative',
  'lodash.isarray': 'lodash/isArray'
}

const options = {
  multiple: Object.keys(mapper).map(key => ({
    search: key,
    replace: mapper[key]
  }))
}

export function getReplaceLodashLoader() {
  return {
    loader: 'string-replace-loader',
    options
  }
}
