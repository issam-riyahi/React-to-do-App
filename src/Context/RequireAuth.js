import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "../api/axios";



const RequireAuth = ({ children }) => {

    const userContext = useAuth();
    const location = useLocation();
    
    if(!userContext.user){
        return <Navigate to="/login"  state={{from: location}} replace />
    }
    return children;
}
 
export default RequireAuth;