/***************************************************
 * Created by nanyuantingfeng on 2019-06-28 12:31. *
 ***************************************************/
import { Context, Next } from './types'
import WebpackCdnPlugin from 'webpack-cdn-plugin'

export default async function mwCDN(context: Context, next: Next) {
  context.cdnOptions = {
    modules: {}
  }

  next()

  const { cdnOptions } = context

  if (cdnOptions && cdnOptions.modules) {
    context.plugins.push(new WebpackCdnPlugin(cdnOptions))
  }
}
