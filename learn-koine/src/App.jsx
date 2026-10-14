import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import { AUTH_ENABLED } from "./authConfig";
import { getGuestResumeLocation } from "./guestProgress";

function App() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const resumeLocation = getGuestResumeLocation();

  return (
    <div className="App">
      <div className="logo-container">
        <h3 id="delta">δ</h3>
        <div className="key-bar"></div>
        <h3 id="kappa">κ</h3>
        <h1 id="didakey">DidaKey</h1>
      </div>
      <div
        className={`App-header${AUTH_ENABLED && showLogin ? " App-header--auth" : ""}`}
      >
        <h2>
          <i>Practicing Koine Greek</i>
        </h2>
        {AUTH_ENABLED && showLogin ? (
          <Login onCancel={() => setShowLogin(false)} />
        ) : (
          <>
            <h3>Choose a Subject:</h3>
            {resumeLocation && (
              <Link className="home-links continue-link" to={resumeLocation}>
                Continue where you left off
              </Link>
            )}
            <div className="links">
              <Link className="home-links" to="vocabulary">
                Vocabulary
              </Link>
              <Link className="home-links" to="parsing-verse">
                Parsing Practice
              </Link>
              <Link className="home-links" to="verb">
                Verbs
              </Link>
              <Link className="home-links" to="about">
                About
              </Link>
            </div>
            {AUTH_ENABLED &&
              (user ? (
                <div className="home-auth-options">
                  <p>Welcome, {user.username}!</p>
                  <button className="home-links" onClick={logout}>
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  className="home-links home-auth-button"
                  onClick={() => setShowLogin(true)}
                >
                  Sign in / Register
                </button>
              ))}
          </>
        )}
      </div>
      <a id="github-link" href="https://github.com/masondz">
        Created by
      </a>
    </div>
  );
}

export default App;
