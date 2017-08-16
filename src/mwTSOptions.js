/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
export default async function (context, next) {

  context.tsOptions = {
    transpileOnly: true,
    compilerOptions: {
      target: 'es2016',
      module: 'es2015',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: false,
      sourceMap: false,

      allowSyntheticDefaultImports: true,
      lib: ['dom', 'es2015', 'es2016'],
      noImplicitAny: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      removeComments: false,
      preserveConstEnums: true,
      skipLibCheck: true
    }
  }

  next()
}
