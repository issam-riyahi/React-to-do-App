import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";


const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const pwdRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/
const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
const Regiter = () => {

    const userRef = useRef(null);

    const [username, setUsername] = useState();
    const [validUsername, setValidUsername] = useState();
    const [usernameFocus, setUsernameFocus] = useState();

    const [fullName, setfullName] = useState();
    const [validFullName, setValidFullName] = useState(true);
    const [fullNameFocus, setFullNameFocus] = useState();
    
    const [email, setemail] = useState();
    const [validEmail, setValidEmail] = useState();
    const [emailFocus, setEmailFocus] = useState();
    
    const [pwd, setPwd] = useState();
    const [validPwd, setValidPwd] = useState();
    const [pwdFocus, setPwdFocus] = useState();

    const [matchPwd, setMatchPwd] = useState();
    const [validMatchPwd, setValidMatchPwd] = useState();
    const [MatchPwdFocus, setMatchPwdFocus] = useState();

    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState();

    console.log(errMsg);


    useEffect(() => {
        userRef.current.focus();
    },[])

    // Usrename Validation
    useEffect(() => {
       const result = userRegex.test(username);
    //    console.log(result);
       setValidUsername(result);
    },[username])
    
    //Password Match 
    useEffect(() => {
       const result = pwdRegex.test(pwd);
       setValidPwd(result);
       const match = pwd === matchPwd ;
       setValidMatchPwd(match);
    },[pwd, matchPwd]);

    // Email validation 
    useEffect(() => {
        const result = emailRegix.test(email);
        setValidEmail(result);
    },[email]);
    
    // Full Name 
    useEffect(() => {
        const result = emailRegix.test(email);
        setValidEmail(result);
    },[fullName]);

    // Clear Error Message 
    useEffect(() => {
        setErrMsg('');
    },[username, email, fullName, pwd , matchPwd]);
    // Input Username
    function handleUsername (e) {
        setUsername(e.target.value);
    }
    // input Email 
    function handleEmail(e){
        setemail(e.target.value);
    }
    // input Password 
    function handlePassword(e) {
        setPwd(e.target.value);
    }
    // input Mtach Password
    function handleMatchPassword(e){
        setMatchPwd(e.target.value);
    }

    // input fullName 

    function handleFullName(e) {
        setfullName(e.target.value);
    }

    const inputStyle = {
        border: "2px solid #ff6a6a"
    }
    const userId = () => {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        + Math.random().toString(16).slice(8)
        + Date.now().toString(16).slice(4);
    }
    // submit function 
    async function  handlesubmit(e) {
        e.preventDefault();
        const usernameCheck = userRegex.test(username);
        const emailCheck = emailRegix.test(email);
        const pwdCheck = pwdRegex.test(pwd);
        console.log(usernameCheck , pwdCheck, emailCheck)
        if(!usernameCheck || !pwdCheck || !emailCheck ) {
            setErrMsg('Invalid Entries');
            return;
        }
        const response  = await axios.get(`/users?username=${username}&email=${email}`)
        console.log(response);
        if(response.data.length > 0){
            setErrMsg('The Username or Email are already in use')
        }
        else {
            axios.post(`/users`,{
                id: userId(),
                username: username,
                email: email,
                fullName: fullName,
                password: pwd,

            },
            {
                headers: {'Content-type': 'Application/json'},
                withCredentials: true
            })
            .then(res => {
                if(res.status == 201){
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.log(error.response)
            })
            
            
        }
        
        
    }
    useEffect(()=>{
        if(success){
            location.pathname = '/login'
        }
    },[success])
    return ( 
        <>
        {
            success 
        ? 
            (<div>
                <h1>Your account has been created with  success</h1>
            </div>)
        
        :
        <div className="register">
            <div className="register-container">
                <h2 className="title">MyTasks</h2>
                <div className={`error-message-g ${errMsg ? 'showError' : ''}`}>
                    <p>{errMsg}</p>
                </div>
                <form onSubmit={handlesubmit}>
                    <div className="input-section">
                        <label htmlFor="fullName">Full Name : </label>
                        <input 
                            type="text" 
                            name="fullName"
                            required  
                            placeholder="Enter Full Name"
                            onChange={(e) => handleFullName(e)}
                            onFocus={()=> setFullNameFocus(true)}
                            onBlur={() => setFullNameFocus(false)}
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="username">Username : </label>
                        <input 
                            type="text" 
                            name="username"
                            style={ (!validUsername  &&  username   ) ? inputStyle : usernameFocus && username ?  { borderColor: '#00e426'} : {}}

                            required 
                            ref={userRef} 
                            placeholder="Enter Full Username"
                            onChange={(e) => handleUsername(e)}
                            onFocus={() => setUsernameFocus(true) }
                            onBlur={() => setUsernameFocus(false) }
                        />
                        <div className={`err ${ !validUsername  &&  username   ?  'showError' : '' }`}>
                            <p className="msg-error">
                                username should have at least 6 charcters <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="input-section">
                        <label htmlFor="email">Email : </label>
                        <input 

                            type="text"
                            name="email"
                            required 
                            style={ (!validEmail  &&  email   ) ? inputStyle : emailFocus && email ?  { borderColor: '#00e426'} : {}}
                            placeholder="example@gmail.com" 
                            onChange={(e) => handleEmail(e) }
                            onFocus={() => setEmailFocus(true) }
                            onBlur={() => setEmailFocus(false)}
                        />
                         <div className={`err ${!validEmail &&  email   ?  'showError' : '' }`}>
                            <p className="msg-error">
                                Enter a valid email   <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="input-section pwd-section">
                        <label htmlFor="pwd">Password : </label>
                        <input 
                            type="password" 
                            name="pwd"
                            style={(!validPwd  &&  pwd   ) ? inputStyle : pwdFocus && pwd ?  { borderColor: '#00e426'} : {}} 
                            placeholder="Enter Password" 
                            onChange={(e) => handlePassword(e) }
                            onFocus={() => setPwdFocus(true) }
                            onBlur={() => setPwdFocus(false)}
                        />

                        <div className={`err ${ (!validPwd  &&  pwd   )   ? 'showError' : '' }`}>
                            <p className="msg-error">
                                8-50 characters, must contain a number and an upper and lower case letter    <br />

                                Password should have one of this symbols ! @ # $ % <br />
                            </p>
                        </div>
                    </div>
                    <div className="input-section">
                        <label htmlFor="matchPwd">Confirm Password : </label>
                        <input 
                            type="password" 
                            name="matchPwd" 
                            style={(!validMatchPwd  &&  matchPwd   ) ? inputStyle : MatchPwdFocus && matchPwd ?  { borderColor: '#00e426'} : {}} 
                            placeholder="Confirm Password" 
                            onChange={(e) => handleMatchPassword(e) }
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}
                        />
                        <div className={`err ${matchPwd && !validMatchPwd   ?  'showError' : '' }`}>
                            <p className="msg-error">
                                Your password not match   <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="register-footer">
                    <div className="login-link">
                        <p>
                            <span>Already registred ?</span> <br />
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                        <button 
                            className="signup"
                            
                        >
                            SIGN UP
                        </button>
                    </div>
                </form>
               
            </div>
        </div>
    }
        </>
     );
}
 
export default Regiter;



