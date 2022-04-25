import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefrechToken from "./useRefreshToken";



const usePrivateAxios = () => {
    const auth  = useAuth();
    const refreshToken = useRefrechToken();
    useEffect(()=>{
    
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
            }
        )

    })

    return  axiosPrivate;
}
 
export default usePrivateAxios;