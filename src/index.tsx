import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { createRouter } from "./routes/index";
import store from "./store";
import { ErrorReport } from "./features/util/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

function AppRouterProvider() {
  try {
    const router = createRouter();

    return <RouterProvider router={router} />;
  } catch (error) {
    // It is important to use ErrorReport and not ErrorBoundary because ErrorBoundary depends on the router
    return <ErrorReport error={error} />;
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouterProvider />
    </Provider>
  </React.StrictMode>,
);
