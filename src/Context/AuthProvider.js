import React, { createContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();

    return (
        <AuthContext.Provider value={{user, setUser}} >
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return React.useContext(AuthContext);
}
export default AuthContext;