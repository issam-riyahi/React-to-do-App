import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../redux/user/userAction";



const Login = () => {

    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    // console.log(userState)

    const userRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState(userState.error);
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');
    console.log(pwd)
    useEffect(() => {
        setErrorMsg('')
    },[pwd, username])

    function handleLogin(e) {
        e.preventDefault();

        if(pwd == '' || username == ''){
            setErrorMsg('the Username and Password are required');
            return;
        }

        console.log(userState)
        dispatch(fetchUser(username, pwd));
        if(userState !== undefined) {
            if(userState.error){
                setErrorMsg(userState.error)
            }
        }
        else {
            setErrorMsg('Username does not exist');
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
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Password : </label>
                        <input type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPwd(e.target.value)}
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
 
export default Login;