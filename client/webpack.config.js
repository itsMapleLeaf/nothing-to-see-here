const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const { resolve } = require("path")

const sourceFolder = resolve(__dirname, "src")
const buildFolder = resolve(__dirname, "build")

module.exports = {
  entry: sourceFolder,
  output: {
    filename: "[name].bundle.js",
    path: buildFolder,
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyWebpackPlugin([
      {
        from: "public",
        ignore: "index.html",
      },
    ]),
    new CleanWebpackPlugin(buildFolder),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
  },
}
