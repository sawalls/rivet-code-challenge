import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ErrorReport } from "./features/util/ErrorPage";
import "./index.css";
import { createRouter } from "./routes/index";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createRouter();

function AppRouterProvider() {
  try {
    return <RouterProvider router={router} />;
  } catch (error) {
    // It is important to use ErrorReport and not ErrorPage because ErrorPage depends on the router
    return <ErrorReport error={error} />;
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouterProvider />
    </Provider>
  </React.StrictMode>
);
