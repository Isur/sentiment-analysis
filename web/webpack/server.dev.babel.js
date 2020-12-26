import path from "path";
import nodeExternals from "webpack-node-externals";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";
import StartServerPlugin from "start-server-webpack-plugin";

export default {
  target: "async-node",
  mode: "development",
  watch: true,
  devtool: "source-map",
  entry: [
    "webpack/hot/poll?1000",
    "./src/server.ts",
  ],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[name].server.js"
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
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
        use: ["awesome-typescript-loader"],
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
  },
  plugins: [
    new Dotenv(),
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "BUILD_TARGET": JSON.stringify("server"),
      }
    }),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
};
