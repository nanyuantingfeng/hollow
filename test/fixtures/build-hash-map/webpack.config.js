import { join } from 'path';
import pkg from './package.json';

export default function customConfig(webpackConfig) {
  webpackConfig.output.path = join(process.cwd(), 'dist', pkg.name, pkg.version);
  return webpackConfig;
};