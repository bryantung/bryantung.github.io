'use strict';

import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';

import config from './webpack.config.babel';

const HOST = 'localhost';
const PORT = 3000;
const rootDir = path.join(__dirname);

const server = new WebpackDevServer(webpack(config), {
  contentBase: path.join(rootDir),
  historyApiFallback: {
    index: 'index.html'
  },
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    chunks: false,
    colors: true
  }
});

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server is running on ${HOST}:${PORT}`);
    opn(`http://${HOST}:${PORT}`);
  }
});
