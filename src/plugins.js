/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HappyPack from 'happypack'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import LodashWebpackPlugin from 'lodash-webpack-plugin'

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
  HTMLWebpackPlugin,
  FriendlyErrorsWebpackPlugin,
  CopyWebpackPlugin,
  DllPlugin,
  DllReferencePlugin,
  WebpackOptionsValidationError,
  WatchIgnorePlugin,
  AggressiveSplittingPlugin,
  HappyPack,
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  BundleAnalyzerPlugin,
  SpeedMeasurePlugin,
  LodashWebpackPlugin,
  MiniCSSExtractPlugin
}
