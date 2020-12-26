import http from "http";
import chalk from "chalk";
import "reflect-metadata";
import app from "./Server/App";
import { AppConfig } from "./Server/Config";

const port = AppConfig.environment.port || "3000";
const server = http.createServer(app.express);

const originalApp = app.express;
let currentApp = app.express;

server.listen(port);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any; // without this line typescript doesn't know what module is
if(module.hot) {
  module.hot.accept("./Server/App", async () => {
    let newApp = app.express;
    if(originalApp === newApp) {
      newApp = (await import("./Server/App")).default.express;
    }
    server.removeListener("request", currentApp);
    server.on("request", newApp);
    currentApp = newApp;
  });
}

// eslint-disable-next-line no-console
console.log(`
  Isomorphic App listening on port ${chalk.red.bold(port)}
  Env: ${chalk.yellow.bold(AppConfig.environment.env)}
  ${AppConfig.environment.env === "development" && `Address: http://localhost:${port}`}
 `);

process.on("unhandledRejection", (reason: string, promise: Promise<unknown>) => {
  console.error("unhandledRejection");
  console.error(reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("uncaughtException");
  console.error(error);
});
