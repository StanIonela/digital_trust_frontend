import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider =({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            axios.get('/api/user/getProfile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};