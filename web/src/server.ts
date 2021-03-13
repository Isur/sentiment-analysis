import http from "http";
import chalk from "chalk";
import "reflect-metadata";
import Container from "typedi";
import App from "@server/App";
import { Config } from "@server/Config";
import { Logger } from "@server/Utils";

const config = Container.get<Config>(Config);

const { env, port } = config.environment;
const app = Container.get<App>(App);
const server = http.createServer(app.express);

const originalApp = app.express;
let currentApp = app.express;

server.listen(port);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any; // without this line typescript doesn't know what module is
if(module.hot) {
  module.hot.accept("./Server/App", reloadApp);
}

async function reloadApp() {
  let newApp = app.express;
  if(originalApp === newApp) {
    newApp = Container.get<App>((await import("./Server/App")).default).express;
  }
  server.removeListener("request", currentApp);
  server.on("request", newApp);
  currentApp = newApp;
}

Logger.Log(`
  Isomorphic App listening on port ${chalk.red.bold(port)}
  Env: ${chalk.yellow.bold(env)}`);

if(env === "development") {
  Logger.Log(`  Address: http://localhost:${port}\n`);
}

process.on("unhandledRejection", (reason: string, promise: Promise<unknown>) => {
  console.error("unhandledRejection");
  console.error(reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("uncaughtException");
  console.error(error);
});
