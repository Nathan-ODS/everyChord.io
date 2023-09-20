import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

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
                console.log('problem with the sent data')
                return;
            }

            const data = res.json();
            const { token } = data;

            localStorage.setItem('token', token);
            // setUser(user)
        } catch (error) {
            console.error('Login error', error)
        }
    }

    function logout() {
        console.log('loging out');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
