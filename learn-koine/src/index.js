import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Loading from "./Loading";
// import Verse from "./Verse";
// import Vocabulary from "./Vocabulary";
// import Verb from "./Verb";

const Verse = lazy(() => import("./Verse"));
const Vocabulary = lazy(() => import("./Vocabulary"));
const Verb = lazy(() => import("./Verb"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "parsing-verse",
    element: <Verse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "vocabulary",
    element: <Vocabulary />,
    errorElement: <ErrorPage />,
  },
  {
    path: "verb",
    element: <Verb />,
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
