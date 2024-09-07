import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    console.log("Checking authentication...");
    try {
      const token=localStorage.getItem("Token")
      const header=`"Authorization:${token}"`
      console.log(header)
      const response = await axios.get(`${API_URL}/checkauth`,{headers:{Authorization:token}});
      console.log("Response:", response);

      if (response.status === 200 && response.data && response.data.message === "Token is valid") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error during authentication check:', err);

      if (err.response) {
        setError(`Server responded with status ${err.response.status}: ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response received from server.');
      } else {
        setError(`Request error: ${err.message}`);
      }

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
