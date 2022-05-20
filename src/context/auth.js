//1.
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../Loader/Loader";
//2.
export const AuthContext = React.createContext();
//3.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
    }, []);
    if (loading) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}
