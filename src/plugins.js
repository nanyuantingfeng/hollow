/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import webpack from 'webpack'

const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
  WebpackOptionsValidationError,
  ProvidePlugin,
  DllPlugin,
  DllReferencePlugin,
  WatchIgnorePlugin,
  IgnorePlugin,
  optimize: { AggressiveSplittingPlugin }
} = webpack

export {
  webpack,
  IgnorePlugin,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  HotModuleReplacementPlugin,
  DllPlugin,
  DllReferencePlugin,
  WebpackOptionsValidationError,
  WatchIgnorePlugin,
  AggressiveSplittingPlugin
}
