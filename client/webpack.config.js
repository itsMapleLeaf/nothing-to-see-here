const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const { resolve } = require("path")

const sourceFolder = resolve(__dirname, "src")
const buildFolder = resolve(__dirname, "build")

console.log("NODE_ENV:", process.env.NODE_ENV)

const tsLoader = {
  loader: "ts-loader",
  options: {
    transpileOnly: true,
    compilerOptions: {
      module: "esnext",
    },
  },
}

module.exports = {
  entry: sourceFolder,
  output: {
    filename: "[name].bundle.js",
    path: buildFolder,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", tsLoader],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public/index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "public"),
        ignore: "index.html",
      },
    ]),
    new CleanWebpackPlugin(buildFolder),
    new Dotenv({
      path: resolve(__dirname, "../.env"),
    }),
    new ForkTsCheckerPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
}
