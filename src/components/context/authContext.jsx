// AuthContext.js
"use client"
import React, { createContext, useContext, useState } from 'react';
import AccountSession from '../../utils/account';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (username, accountId, employeeId) => {
        const accountSession = AccountSession.getInstance();
        accountSession.setUsername(username);
        accountSession.setAccountId(accountId);
        accountSession.setEmployeeId(employeeId)
        setIsLoggedIn(true);
    };

    const logout = () => {
        const accountSession = AccountSession.getInstance();
        accountSession.clearSession();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
