import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth  from "../Hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import LoadingPage from "../components/LoadingPage";
import usePrivateAxios from "../Hooks/usePrivateAxios";

const CheckAuth = ({ children }) => {
    const { user, signIn } = useAuth();
    const [requiestFaild, setRequiestFaild] = useState(false);
    const [requiestSuccess, setRequiestSuccess] = useState(false);
    const location = useLocation();
    const axiosPrivate = usePrivateAxios();



    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        const userId = JSON.parse(localStorage.getItem('user')) ;
        if(accessToken && Object.keys(user).length == 0){    
            try{ 
            
                    axios.post(`/validateToken.php`,"",{
                        headers:{'Authorization': 'Bearer' + ' ' + accessToken }
                        
                    })
                    .then(response => {
                        if(response?.status === 200){
                            axiosPrivate.get(`/user/${userId.userId}`,{
                                headers : {'Authorization' : `Bearer ${accessToken}`}
                            })
                            .then(response => {
                                if(response?.status === 200){
                                    signIn({...response?.data?.user , accessToken : accessToken});
                                    setRequiestSuccess(true)
                                }
                                else{
                                    setRequiestFaild(true);
                                }
                            })
                        }
                        
                        else if(response?.status === 203) {
                            setRequiestFaild(true);
                        }    
                    
                    })
            
        }
        catch(err){
            if(!err?.response){
                console.log(err)
                setRequiestFaild(true);
            }
        }
        }   
        else if(accessToken && Object.keys(user).length > 0){
            setRequiestSuccess(true);
        }
        else{
            setRequiestFaild(true);
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

