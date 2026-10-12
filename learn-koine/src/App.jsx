import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      <div className="logo-container">
        <h3 id="delta">δ</h3>
        <div className="key-bar"></div>
        <h3 id="kappa">κ</h3>
        <h1 id="didakey">DidaKey</h1>
      </div>
      <div className="App-header">
        <h2>
          <i>Practicing Koine Greek</i>
        </h2>
        <h3>Choose a Subject:</h3>
        <div className="links">
          <Link className="home-links" to={"vocabulary"}>
            Vocabulary
          </Link>
          <Link className="home-links" to={"parsing-verse"}>
            Parsing Practice
          </Link>
          <Link className="home-links" to={"verb"}>
            Verbs
          </Link>
          <Link className="home-links" to={"about"}>
            About
          </Link>
        </div>
        {user ? (
          <div className="home-auth-options">
            <p>Welcome, {user.username}!</p>
            <button className="home-links" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : (
          <Link className="home-links" to="/login">
            Sign in / Register
          </Link>
        )}
      </div>
      <a id="github-link" href="https://github.com/masondz">
        Created by
      </a>
    </div>
  );
}

export default App;
