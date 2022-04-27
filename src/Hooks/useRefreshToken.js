import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefrechToken = () => {
    const { user , singIn } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/refresh',JSON.stringify({
            userId: user.userId
        }))

        
        let jwt = response.data.token;
        let payload = jwt.split('.')[1];
        let data = JSON.parse(atob(payload));
        const { email, username, userId} = data.data;
        singIn({...user, accessToken: jwt});
        localStorage.setItem('user',JSON.stringify({userId: userId , username: username}))
        localStorage.setItem('accessToken',  jwt )
        
    }
    return refresh;
}
 
export default useRefrechToken;