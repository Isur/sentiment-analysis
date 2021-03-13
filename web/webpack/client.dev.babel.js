import path from "path";
import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

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
    new ForkTsCheckerWebpackPlugin({ eslint: { files: "./src/**/*.{ts,tsx}" } }),
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
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ['style-loader', "css-loader"],
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
