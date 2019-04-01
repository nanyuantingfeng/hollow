/**************************************************
 * Created by nanyuantingfeng on 29/10/2017 14:29.
 **************************************************/
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { DllPlugin, DllReferencePlugin } from './plugins'
import path from 'path'
import { Context, Next } from './types'

export default async function mwDLL(context: Context, next: Next) {
  context.dll = false
  context.DLL_FILENAME = false

  next()

  const { dll, plugins, DIRs } = context
  const libraryName = '[name]_[hash]'

  //is build DLL
  if (Array.isArray(dll)) {
    plugins.push(
      new DllPlugin({
        path: path.resolve(DIRs.build, 'manifest.json'),
        name: libraryName,
        context: context.context || context.cwd
      })
    )

    context.output = {
      path: DIRs.build,
      filename: `${libraryName}.js`,
      library: libraryName
    }

    context.entry = { dll: dll as any }
  }

  //is Ref DLL Plugin
  if (typeof dll === 'string' || (dll as boolean) === true) {
    const dllPath = (dll as boolean) === true ? path.resolve(DIRs.root, 'dll') : ((dll as unknown) as string)
    const manifest = require(path.join(dllPath, 'manifest.json'))
    const dllFileName = `${manifest.name}.js`

    plugins.push(
      new DllReferencePlugin({
        context: context.context || context.cwd,
        manifest
      })
    )

    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.join(dllPath, dllFileName),
          to: DIRs.build
        }
      ])
    )

    context.DLL_FILENAME = dllFileName
  }
}
