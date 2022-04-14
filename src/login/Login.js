import {  useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import  useAuth  from "../Hooks/useAuth";


const Login = () => {

   
    const navigate = useNavigate();
    const {signIn} = useAuth();
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

            // const response = await axios.get(`/user?username=issam&password=testtest`,{
            //     // headers:{'Content-Type': 'Application/json'},
            //     // withCredentials: true,
            // });
            const response = await axios.get(`/user?username=${username.trim()}&password=${pwd.trim()}`,{
                // headers:{'Content-Type': 'Application/json'},
                // withCredentials: true,
            });
            
            console.log(response?.data?.data.rows);
            if(response?.data?.data.rows.length > 0 ){
                console.log(response?.data);
                setUsername('');
                setPwd('');
                setErrorMsg('');
                const { email, username, fullName, userId} = response?.data?.data?.rows[0];
                signIn({ email, username, fullName, userId});
                localStorage.setItem('user',JSON.stringify({userId: userId, username}))
                setSuccess(true);
            }
            else {
                setErrorMsg('incorrect username or Password ');
            }


        }catch(err){
            if(!err?.response){
                console.log(err)
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
                    <div className="footer-login">

                        <div className="link-register">
                            <Link to="/register" >Create an account ?</Link>
                        </div>
                        <div className="submit">
                            <button className="loginbtn">Sing In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}


export default Login ;