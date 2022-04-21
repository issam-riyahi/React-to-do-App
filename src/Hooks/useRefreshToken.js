import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefrechToken = () => {
    const { user , singIn } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/Authentication/refrechToken.php',JSON.stringify({
            userId: user.userId
        }))
        let jwt = response.data.jwt.split('.');
        let payload = jwt[1];
        let data = JSON.parse(atob(payload));
        const { email, username, userId} = data.data;
        singIn({...user, accessToken: jwt});
        localStorage.setItem('user',JSON.stringify({userId: userId , username: username, userToken: response.data.jwt}))

        
    }
}
 
export default useRefrechToken;