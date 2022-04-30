import React, { createContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});

    const signIn = (user) => {

        setUser(user);

    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user')
    }
    return (
        <AuthContext.Provider value={{user, signIn , signOut}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;