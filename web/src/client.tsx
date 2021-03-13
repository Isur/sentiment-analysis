import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { Store } from "@shared/Redux/store";
import App from "@shared/App";

const history: History = createBrowserHistory();
const initData = document.getElementById("initData").textContent;
const jsonData = JSON.parse(initData);
const store = Store(history, jsonData);

const locales = document.getElementById("locales").textContent;
const lang = JSON.parse(locales);

ReactDOM.hydrate(
  <CookiesProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App langs={lang} server={false} />
      </ConnectedRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("react-app"),
);
