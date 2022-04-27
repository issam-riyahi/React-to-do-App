import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefrechToken from "./useRefreshToken";



const usePrivateAxios = () => {
    const {user}  = useAuth();
    const refreshToken = useRefrechToken();
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config?.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user.accessToken}`
                }
                return config;
            },
            (error) => {
               return  Promise.reject(error);
            }
            
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                
                if(error?.response?.status === 401 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // localStorage.setItem('accessToken', newAccessToken);
                    return axiosPrivate(prevRequest);

                }
                return  Promise.reject(error);
            }
        )
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }

    },[user , refreshToken])

    return  axiosPrivate;
}
 
export default usePrivateAxios;