import path from "path";
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from "copy-webpack-plugin";

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
        { from: "./.env", to: "" }
      ]
    }),
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
};
