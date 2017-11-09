import { resolve } from 'path';
import build from 'af-webpack/build';
import getWebpackConfig from './getWebpackConfig';
import getConfig from './utils/getConfig';
import getPaths from './config/paths';

const debug = require('debug')('roadhog:build');

export default function (opts = {}) {
  const {
    cwd = process.cwd(),
  } = opts;

  const env = process.env.NODE_ENV;
  const babel = resolve(__dirname, './babel.js');
  const paths = getPaths(cwd);

  return new Promise((resolve) => {
    // register babel for config files
    // TODO

    // get user config
    const config = getConfig(env, cwd);
    debug(`user config: ${JSON.stringify(config)}`);

    // get webpack config
    const webpackConfig = getWebpackConfig({
      cwd,
      config,
      babel,
      paths,
    });

    build({
      webpackConfig,
      success: resolve,
    });
  });
}
