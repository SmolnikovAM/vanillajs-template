/* eslint-disable import/no-extranneaous-dependencies */
const path = require("path");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./index.js"
  },
  devServer: {
    publicPath: "/",
    port: 9000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    hot: true
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [precss, autoprefixer]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },

  output: {
    chunkFilename: "[name].js",
    filename: "[name].js"
  },

  mode: "development",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ]
};
