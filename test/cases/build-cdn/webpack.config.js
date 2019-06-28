/***************************************************
 * Created by nanyuantingfeng on 2019-06-28 12:41. *
 ***************************************************/
const path = require('path')

module.exports = function(context) {
  const {
    ENV: { env, isDevelopment }
  } = context

  function prefixReactURL(name) {
    const envU = env === 'beta' ? 'production' : env
    const useMin = envU === 'production'
    return `${name}.${envU}${useMin ? '.min' : ''}.js`
  }

  const modules = {
    index: [
      {
        name: 'react',
        var: 'React',
        path: prefixReactURL('umd/react')
      },
      {
        name: 'react-dom',
        var: 'ReactDOM',
        path: prefixReactURL('umd/react-dom')
      }
    ],

    index0: [
      {
        name: 'react',
        var: 'React',
        path: prefixReactURL('umd/react')
      }
    ],

    index1: [
      {
        name: 'react-dom',
        var: 'ReactDOM',
        path: prefixReactURL('umd/react-dom')
      }
    ]
  }

  context.cdnOptions = {
    prod: !isDevelopment,
    modules: modules,
    publicPath: './',
    pathToNodeModules: path.resolve('..', '..', '..')
  }
}
