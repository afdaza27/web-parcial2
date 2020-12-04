import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Series from "./components/series";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function getBrowserLanguage() {
  return navigator.language || navigator.userLanguage;
}

function getLocale() {
  const lang = getBrowserLanguage();
  if (lang === "es") {
    return localeEsMessages;
  } else {
    return localeEnMessages;
  }
}

ReactDOM.render(
  <IntlProvider locale={getBrowserLanguage()} messages={getLocale()}>
    <Series />
  </IntlProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
