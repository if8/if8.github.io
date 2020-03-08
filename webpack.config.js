var path = require("path")
var webpack = require("webpack")
var htmlWebpackPlugin = require("html-webpack-plugin")
var copyWebpackPlugin = require("copy-webpack-plugin")
var vueLoaderPlugin = require("vue-loader/lib/plugin")
var miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {
  let config = {
    entry: {
      app: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "./static"),
      publicPath: "/static",
      filename: argv.mode === "production" ? "[name].[hash].js" : "[name].js"
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@libs": path.resolve(__dirname, "./src/libs"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@bulma": path.resolve(__dirname, "./src/styles/bulma"),
        "@components": path.resolve(__dirname, "./src/components")
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.sass$/,
          use: [
            miniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: { sassOptions: { indentedSyntax: true } }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [miniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              css: [miniCssExtractPlugin.loader, "css-loader"],
              postcss: [miniCssExtractPlugin.loader, "css-loader"],
              sass: [
                miniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "sass-loader",
                  options: { indentedSyntax: true }
                }
              ],
              scss: [
                miniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "sass-loader",
                  options: { sassOptions: { indentedSyntax: true } }
                }
              ]
            }
          }
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(eot(|\?v=.*)|woff(|\?v=.*)|woff2(|\?v=.*)|ttf(|\?v=.*)|svg(|\?v=.*))$/,
          loader: "file-loader",
          options: { name: "fonts/[name].[ext]" }
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        template: "./src/index.html"
      }),

      new miniCssExtractPlugin({
        filename: argv.mode === "production" ? "app.[hash].css" : "app.css",
        allChunks: true
      }),

      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: argv.mode
        }
      }),

      new copyWebpackPlugin([
        {
          context: "src/public",
          from: "*",
          to: path.join(__dirname, "static")
        }
      ]),

      new vueLoaderPlugin()
    ],
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "vue-awesome": "VueAwesome"
    }
  }

  if (argv.mode === "development") {
    config.devServer = {
      contentBase: path.resolve(__dirname, "src", "public"),
      compress: true,
      historyApiFallback: true,
      open: true,
      openPage: "static",
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  }

  if (argv.mode === "production") {
  }

  return config
}
