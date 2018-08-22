/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HappyPack from 'happypack'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
  WebpackOptionsValidationError,
  ProvidePlugin,
  DllPlugin,
  DllReferencePlugin,
  HashedModuleIdsPlugin,
  WatchIgnorePlugin,
  optimize: { AggressiveSplittingPlugin }
} = webpack

export {
  webpack,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  HotModuleReplacementPlugin,
  MiniCssExtractPlugin,
  HTMLWebpackPlugin,
  FriendlyErrorsWebpackPlugin,
  CopyWebpackPlugin,
  DllPlugin,
  DllReferencePlugin,
  HashedModuleIdsPlugin,
  WebpackOptionsValidationError,
  ForkTsCheckerWebpackPlugin,
  WatchIgnorePlugin,
  AggressiveSplittingPlugin,
  HappyPack,
  HardSourceWebpackPlugin,
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  BundleAnalyzerPlugin
}
