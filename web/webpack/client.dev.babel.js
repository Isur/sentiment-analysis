import path from "path";
import webpack from 'webpack';

export default {
  target: "web",
  devtool: "source-map",
  entry: [
    "@babel/polyfill",
    'webpack-hot-middleware/client',
    "./src/client.tsx"
  ],
  mode: "development",
  output: {
    filename: "client.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
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
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        loader: ['style-loader', "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
