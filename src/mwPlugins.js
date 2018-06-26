/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path';

import {
  MiniCssExtractPlugin,
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  HashedModuleIdsPlugin,
  AggressiveSplittingPlugin,
} from './plugins';

import { notifier, fnProgressHandler } from './util';

export default async function mwPlugins(context, next) {
  context.plugins = [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          notifier.notify({
            title: 'hollow cli',
            message: 'warn',
            contentImage: path.join(__dirname, '../assets/warn.png'),
            sound: 'Glass',
          });
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'hollow cli',
          message: `${severity} : ${error ? error.name : error}`,
          subtitle: error ? error.file : error || '',
          contentImage: path.join(__dirname, '../assets/fail.png'),
          sound: 'Glass',
        });
      },
    }),
    new ProgressPlugin(fnProgressHandler),
    new HashedModuleIdsPlugin(),
  ];

  next();

  const {hash, compress, plugins, dll} = context;
  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization.splitChunks = {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    };

  }

  const filename = hash ? '[name]-[hash].css' : '[name].css';
  const chunkFilename = hash ? '[id]-[hash].css' : '[id].css';

  plugins.push(new MiniCssExtractPlugin({
    filename,
    chunkFilename,
  }));

  context.webpackConfig.optimization.minimize = !!compress;

  // dll 模式下不能使用当前插件
  if (!Array.isArray(dll)) {
    plugins.push(new AggressiveSplittingPlugin({
      minSize: 1,
      maxSize: 1024 * 1024,
      chunkOverhead: 0,
      entryChunkMultiplicator: 1,
    }));
  }

  context.plugins = plugins;

//  const {cwd, outputPath} = context;
//  context.webpackConfig.recordsOutputPath = path.join(cwd, outputPath, 'records.json');
}
