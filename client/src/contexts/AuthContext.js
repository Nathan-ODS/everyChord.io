import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Check if token is still valid
  // If so, fetch user
  useEffect(() => {
    async function validateToken(token) {
      const res = await fetch('/api/tokenValidation', {
        method: 'GET',
        headers: {
          'Authorization': storedToken,
          'Content-Type': 'application/json',
        },
      })

      if(!res.ok) {
        // token is invalid
        const error = await res.json()
        console.log('logout', error.message)
        logout()
        return
      }
      
      const user = await res.json()
      setUser(user)
    }

    const storedToken = localStorage.getItem('token');
    if(storedToken) {
      validateToken(storedToken)
    } else {
      setUser(null)
    }

  }, []);

  async function login(userName, password) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password })
      });

      if (!res.ok) {
        return
      }

      const data = await res.json();
      const { token, user } = data;

      localStorage.setItem('token', token);
      setUser(user)
    } catch (error) {
      console.error('Login error', error)
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
