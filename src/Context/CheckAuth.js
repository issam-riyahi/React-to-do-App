import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";


const CheckAuth = ({ children }) => {
    const userContext = useAuth();
    const [requiestFaild, setRequiestFaild] = useState(false);
    const [requiestSuccess, setRequiestSuccess] = useState(false);
    const location = useLocation();


    useEffect(() => {
        let userStorage = JSON.parse(localStorage.getItem('user'));
        
        if(userStorage){    
            console.log(userStorage)
        try{
            axios.get(`/users?id=${userStorage.userId}`,{
                headers:{'Content-Type': 'Application/json'},
                withCredentials: true,
            })
            .then(response => {
                if(response?.data.length > 0 ){
                    
                    console.log(response?.data[0])
                    const { email, username, fullName, id} = response?.data[0];
                    userContext.setUser({email, username, fullName, id});
                    setRequiestSuccess(true)
                }
                
            })
            


        }catch(err){
            if(!err?.response){
                setRequiestFaild(true);
            }
        }
        }else{
            setRequiestFaild(true);
        }
    },[])

    if(requiestFaild){
        return <Navigate to="/login"  state={{from: location}} replace />
    }
    else if(requiestSuccess){
        return children;
    } 
    return <div>Loading...</div>
}
 
export default CheckAuth;