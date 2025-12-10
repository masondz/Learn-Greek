import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = isRegistering 
      ? await register(username, password)
      : await login(username, password);

    setLoading(false);

    if (result.success) {
      navigate('/vocabulary');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>DidaKey</h1>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>
        
        <p className="toggle-mode">
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </span>
        </p>
        
        <Link to="/" className="back-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
