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
import Login from "./Login";

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
    path: "/login",
    element: <Login />,
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

