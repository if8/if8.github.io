const webpack = require('webpack')
const pathEnum = require('./path.enum')

module.exports = {
  mode: 'development',

  entry: ['webpack-hot-middleware/client?reload=true'],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader'],
            postcss: ['vue-style-loader', 'css-loader'],
            scss: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        }
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devtool: 'eval-source-map',

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devServer: {
    // contentBase: '/',
    compress: true,
    historyApiFallback: true,
    open: true,
    // openPage: 'static',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
