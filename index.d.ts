/***************************************************
 * Created by nanyuantingfeng on 2020/4/1 12:43. *
 ***************************************************/
import Config = require('webpack-chain')

type $ElementType<T extends { [P in K & any]: any }, K extends keyof T | number> = T[K]

interface IPatchOptions {
  defines: Record<string, string>
  provides: Record<string, string>
  externals: Record<string, string>
  noParse: string[]
  htmls: Record<string, { template: string; favicon: string }> & { ['*']?: { template?: string; favicon?: string } }
  vendors: [string, string[]]
  files: Record<string, string | { patch: string; to: string }>
  sdks: Record<string, string[]> & { ['*']?: string[] }
  entry: Record<string, string> | string
  imports: Array<{ libraryName: string; style: boolean; libraryDirectory?: string }>
  pxtorem: { rootValue: number; propWhiteList?: string[] }
  alias: Record<string, string>
}

interface IPatchMixin {
  (options: Partial<IPatchOptions>): void
  defines(defines: $ElementType<IPatchOptions, 'defines'>): void
  provides(provides: $ElementType<IPatchOptions, 'provides'>): void
  externals(externals: $ElementType<IPatchOptions, 'externals'>): void
  noParse(noParse: $ElementType<IPatchOptions, 'noParse'>): void
  htmls(htmls: $ElementType<IPatchOptions, 'htmls'>): void
  vendors(vendors: $ElementType<IPatchOptions, 'vendors'>): void
  files(files: $ElementType<IPatchOptions, 'files'>): void
  sdks(sdks: $ElementType<IPatchOptions, 'sdks'>): void
  entry(entry: $ElementType<IPatchOptions, 'entry'>): void
  imports(imports: $ElementType<IPatchOptions, 'imports'>): void
  browserslist(browserslist: string[], compilertarget?: 'es5' | 'es6' | string[]): void
  pxtorem(options: $ElementType<IPatchOptions, 'pxtorem'>): void
  alias(options: $ElementType<IPatchOptions, 'alias'>): void
}

interface PatchedConfig extends Config {
  getEntryNameAndPluginName(): {
    entryName: string
    pluginName?: string
    moduleName: string
    UniqueName: string
  }

  useClusterMaster(options: { masterId: string; injected: string }): this
  useClusterWorker(options: { masterId: string; workerId: string; entry?: string }): this

  patch: IPatchMixin
}

declare global {
  module 'whispered-build/configs' {
    function createConfig(): PatchedConfig
    export = createConfig
    export default createConfig
  }

  module 'whispered-build/webpack.entry.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.entry.dev.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.entry.pro.config' {
    const config: PatchedConfig
    export = config
    export default config
  }

  module 'whispered-build/webpack.plugin.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.plugin.dev.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.plugin.pro.config' {
    const config: PatchedConfig
    export = config
    export default config
  }

  module 'whispered-build/webpack.simple.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.simple.dev.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
  module 'whispered-build/webpack.simple.pro.config' {
    const config: PatchedConfig
    export = config
    export default config
  }
}
