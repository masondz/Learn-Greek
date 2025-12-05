import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Loading from "./Loading";

const Verse = lazy(() => import("./Verse"));
const Vocabulary = lazy(() => import("./Vocabulary"));
const Verb = lazy(() => import("./Verb"));
const About = lazy(() => import("./About"));
const Alphabet = lazy(() => import("./games/Starfinder/Alphabet3"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "parsing-verse/*",
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
  {
    path: "about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "alphabet",
    element: <Alphabet />,
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

