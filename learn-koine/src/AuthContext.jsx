import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AUTH_ENABLED } from './authConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    AUTH_ENABLED ? localStorage.getItem('token') : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!AUTH_ENABLED) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
      setUser(null);
      setLoading(false);
      return;
    }

    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUser({ username: storedUsername });
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (!AUTH_ENABLED) {
      return { success: false, message: 'Sign-in is unavailable.' };
    }

    try {
      const response = await axios.post('http://localhost:5092/api/auth/login', {
        username,
        password
      });
      
      const { token, username: returnedUsername } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', returnedUsername);
      setToken(token);
      setUser({ username: returnedUsername });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || 'Login failed' 
      };
    }
  };

  const register = async (username, password) => {
    if (!AUTH_ENABLED) {
      return { success: false, message: 'Registration is unavailable.' };
    }

    try {
      const response = await axios.post('http://localhost:5092/api/auth/register', {
        username,
        password
      });
      
      const { token, username: returnedUsername } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', returnedUsername);
      setToken(token);
      setUser({ username: returnedUsername });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
