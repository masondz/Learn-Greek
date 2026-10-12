import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Login.css";

function Login({ onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }

    if (isRegistering && password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = isRegistering
        ? await register(username.trim(), password)
        : await login(username.trim(), password);

      if (result.success) {
        //  navigate("/");
        onCancel(); //Closes login form.
      } else {
        setError(
          typeof result.message === "string"
            ? result.message
            : "Unable to sign in. Please check your details and try again."
        );
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setIsRegistering((registering) => !registering);
    setConfirmPassword("");
    setError("");
  };

  return (
    <section className="login-card" aria-labelledby="login-title">
      <div className="login-card-heading">
        <h3 id="login-title">
          {isRegistering ? "Create your account" : "Sign in"}
        </h3>
      </div>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="account-username">Username</label>
          <input
            autoComplete="username"
            disabled={loading}
            id="account-username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your username"
            required
            type="text"
            value={username}
          />
        </div>

        <div className="login-field">
          <label htmlFor="account-password">Password</label>
          <input
            autoComplete={isRegistering ? "new-password" : "current-password"}
            disabled={loading}
            id="account-password"
            name="password"
            minLength={isRegistering ? 8 : undefined}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={isRegistering ? "At least 8 characters" : "Your password"}
            required
            type={showPassword ? "text" : "password"}
            value={password}
          />
        </div>

        {isRegistering && (
          <div className="login-field">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              autoComplete="new-password"
              disabled={loading}
              id="confirm-password"
              name="confirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter the password again"
              required
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
            />
          </div>
        )}

        <label className="show-password-control">
          <input
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
            disabled={loading}
            type="checkbox"
          />
          Show password{isRegistering ? "s" : ""}
        </label>

        <button className="login-submit" disabled={loading} type="submit">
          {loading
            ? "Please wait…"
            : isRegistering
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <p className="login-mode-toggle">
        {isRegistering ? "Already have an account?" : "New to DidaKey?"}
        <button disabled={loading} onClick={changeMode} type="button">
          {isRegistering ? "Sign in" : "Create an account"}
        </button>
      </p>

      <button
        className="login-cancel"
        disabled={loading}
        onClick={onCancel}
        type="button"
      >
        Go Back
      </button>
    </section>
  );
}

export default Login;
