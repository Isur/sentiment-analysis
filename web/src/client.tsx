import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { Store } from "./Common/Redux/store";
import App from "./Common/App";

const history: History = createBrowserHistory();
const initData = document.getElementById("initData").textContent;
const jsonData = JSON.parse(initData);
const store = Store(history, jsonData);

ReactDOM.hydrate(
  <CookiesProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("react-app"),
);
