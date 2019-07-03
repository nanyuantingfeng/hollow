/***************************************************
 * Created by nanyuantingfeng on 2019-06-28 12:41. *
 ***************************************************/
module.exports = function(config) {
  function prefixReactURL(name) {
    const env = process.env.NODE_ENV || 'development'
    const envU = env === 'beta' ? 'production' : env
    const useMin = envU === 'production'
    return `${name}.${envU}${useMin ? '.min' : ''}.js`
  }

  const modules = {
    index2: [
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

  config.patch({ cdn: modules })

  return false
}
