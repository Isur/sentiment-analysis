import webpack from "webpack";
import { Service } from "typedi";
import whm from "webpack-hot-middleware";
import wdm from "webpack-dev-middleware";
import express, { Router } from "express";
import { Logger } from ".";
import webpackClientDevConfig from "@root/webpack/client.dev.babel.js";

@Service()
class RouterCache {
  private _cached: Router;
  public constructor() {
    this._cached = null;
  }

  public mount = () => {
    if(this._cached) return this._cached;
    const router = this._cached = express.Router();

    Logger.Log(`\nWebpack Hot Middleware has been enabled!`);
    const compiler = webpack(webpackClientDevConfig as webpack.Configuration);

    router.use(wdm(compiler, {
      logLevel: "warn",
      logTime: true,
      publicPath: webpackClientDevConfig.output.publicPath,
    }));

    router.use(whm(compiler, {
      log: Logger.Log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    }));

    return router;
  }
}

export default RouterCache;
