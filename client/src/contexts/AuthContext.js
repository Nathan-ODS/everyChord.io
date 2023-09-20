import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    async function login() {
        console.log('login in to nathan')
        const body = {userName: 'nathan', password: '1234'}

        try {
            const res = await fetch('/api/login', {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(body)
            });

            if(!res.ok) {
                console.log('problem with the sent data')
                return;
            }

            const data = res.json();
            const {token, user} = data;

            localStorage.setItem('token', token);
            setUser(user)
        } catch (error) {
            console.error('Login error', error)
        }
    }

    function logout() {
        console.log('login out');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
