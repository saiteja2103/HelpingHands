import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/donators/me`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: {
              ...response.data.user,
              name: response.data.user.name,
            },
          }));
        } catch (err) {
          console.error('Error fetching user data', err);
        }
      }
    };

    fetchUserData();
  }, [auth.token]);

  // Function to save token and update auth state
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({
      token,
      isAuthenticated: true,
      user: null, // User data will be fetched in useEffect
    });
  };

  // Function to remove token and update auth state
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};