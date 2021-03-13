import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';


export default {
  target: "web",
  entry: [
    "@babel/polyfill",
    "./src/client.tsx"
  ],
  mode: "production",
  output: {
    filename: "client.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./public", to: "public/" }]
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new ForkTsCheckerWebpackPlugin({ eslint: { files: "./src/**/*.{ts,tsx}" } }),
  ],
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".scss"],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
};
