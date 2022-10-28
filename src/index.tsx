import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "./router/PageRoutes";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <Provider store={store}>
        <PageRoutes />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
