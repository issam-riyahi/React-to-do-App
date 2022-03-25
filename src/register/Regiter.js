


const Regiter = () => {
    return ( 
        <div className="register">
            <div className="register-container">
                <h2 className="title">MyTasks</h2>
                <form action="">
                    <div className="input-section">
                        <label htmlFor="">Full Name : </label>
                        <input type="text" name="fullName" placeholder="Enter Full Name" />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Username : </label>
                        <input type="text" name="username" placeholder="Enter Full Username" />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Email : </label>
                        <input type="text" name="email" placeholder="example@gmail.com" />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Password : </label>
                        <input type="password" name="password" placeholder="Enter Password" />
                    </div>
                    <div className="input-section">
                        <label htmlFor="">Confirm Password : </label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" />
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
