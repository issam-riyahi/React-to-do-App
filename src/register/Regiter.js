import { useRef, useState, useEffect } from "react";



const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const pwdRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/
const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
const Regiter = () => {

    const userRef = useRef(null);
    const errorref = useRef();

    const [username, setUsername] = useState();
    const [validUsername, setValidUsername] = useState();
    const [usernameFocus, setUsernameFocus] = useState();
    console.log(username);

    const [fullName, setfullName] = useState();
    const [validFullName, setValidFullName] = useState();
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



    useEffect(() => {
        userRef.current.focus();
    },[])

    // Usrename Validation
    useEffect(() => {
       const result = userRegex.test(username);
       console.log(result);
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

    return ( 
        <div className="register">
            <div className="register-container">
                <h2 className="title">MyTasks</h2>
                <form action="">
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
                            style={  usernameFocus && !validUsername  ||  usernameFocus && !username   ?  inputStyle : {}}

                            required 
                            ref={userRef} 
                            placeholder="Enter Full Username"
                            onChange={(e) => handleUsername(e)}
                            onFocus={() => setUsernameFocus(true) }
                            onBlur={() => setUsernameFocus(false) }
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="email">Email : </label>
                        <input 

                            type="text"
                            name="email"
                            required 
                            placeholder="example@gmail.com" 
                            onChange={(e) => handleEmail(e) }
                            onFocus={() => setEmailFocus(true) }
                            onBlur={() => setEmailFocus(false)}
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="pwd">Password : </label>
                        <input 
                            type="password" 
                            name="pwd" 
                            placeholder="Enter Password" 
                            onChange={(e) => handlePassword(e) }
                            onFocus={() => setPwdFocus(true) }
                            onBlur={() => setPwdFocus(false)}
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="matchPwd">Confirm Password : </label>
                        <input 
                            type="password" 
                            name="matchPwd" 
                            placeholder="Confirm Password" 
                            onChange={(e) => handleMatchPassword(e) }
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}
                        />
                    </div>
                    <div className="submit">
                        <button className="signup">SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
        
     );
}
 
export default Regiter;



