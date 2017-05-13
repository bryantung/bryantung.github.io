import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const rootDir = path.join(__dirname, './');
const env = process.env.NODE_ENV || 'development';
const isDevEnv = env === 'development';

const entries = [path.join(rootDir, 'src/client')];
if (isDevEnv) {
  entries.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  );
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  })
];
if (isDevEnv) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true })
  );
}

export default {
  devtool: isDevEnv? 'cheap-module-eval-source-map':'cheap-module-source-map',
  entry: entries,
  output: {
    path: path.join(rootDir, 'assets'),
    publicPath: '/assets/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {'modules': false}], 'react', 'stage-0']
            }
          }
        ]
      }
    ]
  }
};