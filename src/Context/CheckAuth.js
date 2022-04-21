import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth  from "../Hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import Laoding from "../components/Loading";
import LoadingPage from "../components/LoadingPage";


const CheckAuth = ({ children }) => {
    const { user, signIn } = useAuth();
    const [requiestFaild, setRequiestFaild] = useState(false);
    const [requiestSuccess, setRequiestSuccess] = useState(false);
    const location = useLocation();
    console.log(user);
    useEffect(() => {
        let userStorage = JSON.parse(localStorage.getItem('user'));
        if(userStorage && Object.keys(user).length == 0){    
            // try{ 
            console.log(userStorage)
            axios.get(`/Authentication/validateJwt.php`,{
                headers:{'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTA1NDM0MzEsImV4cCI6MTY1MDU0MzQ5MSwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjMwMDEiLCJkYXRhIjp7InVzZXJuYW1lIjoiaXNzYW0iLCJlbWFpbCI6Imlzc2Ftcml5YWhpQGdtYWlsLmNvbSIsInVzZXJJZCI6Inc4NGIwOWYyOGQ2NmU4MjEifX0.gFM87wL-qPPPK-PepZ3YkGhHIN1TLO9JinCiKFAdnLg',
            'Content-Type' : 'application/x-www-form-urlencoded'},
                // withCredentials: true,  
            })
            .then(response => {

                console.log(response);  
                // if(response?.data?.data?.rows.length > 0 ){
                    
                //     const { email, username, fullName, userId} = response?.data?.data?.row;
                //     signIn({email, username, fullName, userId});
                //     setRequiestSuccess(true)
                // }
                // else {
                //     setRequiestFaild(true);
                // }
                
            })
            


        // }catch(err){
        //     if(!err?.response){
        //         console.log(err)
        //         setRequiestFaild(true);
        //     }
        // }
        }else if(userStorage && Object.keys(user).length > 0){
            setRequiestSuccess(true);
        }
    },[])
    


    if(requiestFaild){
        return <Navigate to="/login"  state={{from: location}} replace />
    }
    else if(requiestSuccess){
        return children;
    } 
    return (<LoadingPage />)
}
 
export default CheckAuth;