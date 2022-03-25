


const Login = () => {
    return ( 
        <div className="login">
            <div className="login-container">
                <h2 className="title">MyTasks</h2>
                <form action="">
                   
                    <div className="input-section">
                        <label htmlFor="">Username / Email : </label>
                        <input type="text" name="username" placeholder="Enter Username or Email" />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Password : </label>
                        <input type="password" name="password" placeholder="Enter Password" />
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