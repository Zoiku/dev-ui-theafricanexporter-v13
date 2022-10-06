import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ScrollToTop from "./Components/ScrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./Redux/store";
import persistor from "./Redux/store";
import GoogleAnalytics from "./Components/GA2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <GoogleAnalytics />
        <ScrollToTop />
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
