import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const nom = localStorage.getItem("nom");
        if (token) {
            setUser({ token, nom });
        }
        setLoading(false);
    }, []);

    const login = (token, nom) => {
        localStorage.setItem("token", token);
        localStorage.setItem("nom", nom);
        setUser({ token, nom });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nom");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};