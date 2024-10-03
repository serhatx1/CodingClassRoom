import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    console.log("Checking authentication...");
    try {
        const token = localStorage.getItem("Token");
        if (!token || token.length < 5) {
            setIsAuthenticated(false);
            setRole(null);
            setUser(null)
            return; 
        }

        const r = await axios.get(`${API_URL}/checkauth`, {
            headers: { Authorization: `${token}` }
        });

        if (r.status !== 200) {
            setIsAuthenticated(false);
            setRole(null);
            setUser(null)

            return; 
        }

        const response = await axios.get(`${API_URL}/checkrole`, {
            headers: { Authorization: `${token}` }
        });
        const userResponse = await axios.get(`${API_URL}/user/get`, {
            headers: { Authorization: `${token}` }
        });


        if (response.status === 200) {
            setIsAuthenticated(true);
            console.log(userResponse.data)
            setRole(response.data.role); 
            setUser(userResponse.data)
        } else {
            setIsAuthenticated(false);
            setRole(null);
            setUser(null)

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
        setUser(null)

    } finally {
        setLoading(false); 
    }
};



  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    console.log("context updated:", isAuthenticated);
  }, [isAuthenticated,role,loading,user]);

  return (
  <AuthContext.Provider value={{ isAuthenticated, role, loading,user, error, setIsAuthenticated,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
