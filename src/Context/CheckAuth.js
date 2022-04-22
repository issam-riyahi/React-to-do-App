import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth  from "../Hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import LoadingPage from "../components/LoadingPage";


const CheckAuth = ({ children }) => {
    const { user, signIn } = useAuth();
    const [requiestFaild, setRequiestFaild] = useState(false);
    const [requiestSuccess, setRequiestSuccess] = useState(false);
    const location = useLocation();
    console.log(user);
    useEffect(() => {
        let userStorage = localStorage.getItem('accessToken');
        if(userStorage && Object.keys(user).length == 0){    
            try{ 
            console.log( userStorage)
            axios.post(`/Authentication/validateJwt.php`,"",{
                headers:{'Authorization': 'Bearer' + ' ' + userStorage,
                

            },
                
            })
            .then(response => {

                  
                if(response?.data?.data ){
                    console.log(response.data.data.data);
                    const { email, username, fullName, userId} = response.data.data.data;
                    signIn({email, username, fullName, userId});
                
                    setRequiestSuccess(true) ;   
                }
                else {
                    setRequiestFaild(true);
                }
                
            }).catch(err => {

                if(err?.response.status === 401){
                    setRequiestFaild(true);
                }
            })
            


        }catch(err){
            if(!err?.response){
                console.log(err)
                setRequiestFaild(true);
            }
        }
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

