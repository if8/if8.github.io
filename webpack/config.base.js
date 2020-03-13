const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pathEnum = require('./path.enum')

module.exports = ({
  mode,
  entry,
  output,
  module,
  plugins,
  devtool,
  ...envConfig
}) => ({
  mode,

  entry: [pathEnum.entryPath, ...entry],

  output: {
    path: pathEnum.path,
    publicPath: pathEnum.publicPath,
    ...output,
  },

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.vue', '.js', '.ts', '.css', '.scss'],
    alias: pathEnum.resolveAlias,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: pathEnum.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: pathEnum.fontsFolder,
            },
          },
        ],
      },
      ...module.rules,
    ],
  },

  plugins: [
    ...plugins,
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: pathEnum.templatePath,
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: pathEnum.srcStaticPath,
        to: pathEnum.outputPath,
      },
    ]),
    new VueLoaderPlugin(),
  ],

  devtool,

  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
  },

  ...envConfig,
})
