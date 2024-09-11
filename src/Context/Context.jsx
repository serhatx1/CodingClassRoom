import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);  // New state to store the user role
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    console.log("Checking authentication...");
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/checkrole`, {
        headers: { Authorization: `${token}` }
      });

      console.log("Response:", response);

      if (response.status === 200) {
        setIsAuthenticated(true);
        setRole(response.data.role); 
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    } catch (err) {
      console.error('Error during authentication check:', err);

      if (err.response) {
        setError(`Server responded with status ${err.response.status}: ${err.response.data.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response received from server.');
      } else {
        setError(`Request error: ${err.message}`);
      }

      setIsAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, error, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
