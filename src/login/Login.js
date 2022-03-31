import {  useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../Context/AuthProvider";


const Login = () => {

   
    const navigate = useNavigate();
    const userContext = useAuth();
    const location  = useLocation();
    const redirectPath = location.state?.from?.pathname || '/' ;
    const userRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState();
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setErrorMsg('')
    },[pwd, username])
    
    
    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        if(success){
            const userId = JSON.parse(localStorage.getItem('user')).userId;
            navigate(`/home/${userId}`,{replace: true});
        }
    },[success]);


    async function handleLogin(e) {
        e.preventDefault();

        if(pwd == '' || username == ''){
            setErrorMsg('the Username and Password are required');
            return;
        }

        try{

            const response = await axios.get(`/users?username=${username}&password=${pwd}`,{
                headers:{'Content-Type': 'Application/json'},
                withCredentials: true,
            });
            
            if(response?.data.length > 0 ){
                
                setUsername('');
                setPwd('');
                setErrorMsg('');
                const { email, username, fullName, id} = response?.data[0];
                userContext.setUser({ email, username, fullName, id});
                localStorage.setItem('user',JSON.stringify({userId: id, username}))
                setSuccess(true);
            }
            else {
                setErrorMsg('incorrect username or Password ');
            }


        }catch(err){
            if(!err?.response){
                setErrorMsg('no server reponse')
            }
        }

      

    }

    

    return ( 
        <div className="login">
            <div className="login-container">
                <h2 className="title">MyTasks</h2>
                <div className={`error-message-g ${errorMsg ? 'showError' : ''}`}>
                    <p>{errorMsg}</p>
                </div>
                <form onSubmit={handleLogin}>
                   
                    <div className="input-section">
                        <label htmlFor="">Username / Email : </label>
                        <input type="text"
                            name="username"
                            placeholder="Enter Username or Email"
                            onChange={(e)=> setUsername(e.target.value)}
                            ref={userRef}
                            value={username}
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Password : </label>
                        <input type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                        />
                    </div>
                    
                    <div className="submit">
                        <button className="loginbtn">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
     );
}


export default Login ;