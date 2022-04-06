import AuthContext  from "../Context/AuthProvider";
import React from "react";

const useAuth = () => {
    return React.useContext(AuthContext);
}
 
export default useAuth;

