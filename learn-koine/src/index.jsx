import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Loading from "./Loading";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const Verse = lazy(() => import("./ParsingPractice/Verse.jsx"));
const Vocabulary = lazy(() => import("./Vocabulary/Vocabulary.jsx"));
const Verb = lazy(() => import("./Verbs/Verb.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const Alphabet = lazy(() => import("./games/Starfinder/Alphabet3"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "parsing-verse/*",
    element: (
      <ProtectedRoute>
        <Verse />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "vocabulary",
    element: (
      <ProtectedRoute>
        <Vocabulary />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "verb",
    element: (
      <ProtectedRoute>
        <Verb />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "alphabet",
    element: (
      <ProtectedRoute>
        <Alphabet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
