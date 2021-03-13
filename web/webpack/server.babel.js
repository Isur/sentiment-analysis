import path from "path";
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from "copy-webpack-plugin";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';


export default {
  target: "async-node",
  mode: "production",
  devtool: "source-map",
  entry: [
    "./src/server.ts",
  ],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../build"),
    chunkFilename: "[name].server.js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]"
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./.env", to: "" },
        { from: "./prisma", to: "prisma/" },
        { from: "./locales", to: "locales/" },
        { from: "./tsconfig.json", to: "tsconfig.json" }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({ eslint: { files: "./src/**/*.{ts,tsx}" } }),
  ],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.s?css$/,
        loader: "ignore-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
};
