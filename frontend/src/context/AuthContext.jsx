import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('passport_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('passport_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      console.error("Login fetch error:", err);
      return { error: 'Could not connect to backend server. Make sure it is running on port 5000.' };
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('passport_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      console.error("Signup fetch error:", err);
      return { error: 'Could not connect to backend server. Make sure it is running on port 5000.' };
    }
  };

  const updateProfile = async (profileData) => {
    const res = await fetch('http://localhost:5000/api/users/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, ...profileData })
    });
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('passport_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('passport_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
