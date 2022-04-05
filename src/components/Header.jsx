import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import  useAuth  from "../Hooks/useAuth";


const Header = () => {

    const {user , signOut} = useAuth();

    useEffect(()=> {
        let links = document.querySelectorAll('.nav a');
        
        links.forEach(link => {

            
            link.addEventListener('click' , ()=>{
                removeActive();
                link.classList.add('active');
            })
        })

        function removeActive(){
            links.forEach(link => {

            
               
                    link.classList.remove('active');
                
            })
        }
    },[])

    useEffect(() => {
        const dropdown = document.querySelector('.dropdown');
        function toggleClass() {
            dropdown.classList.toggle('open');
        }
        document.querySelector('.dropdown-btn').addEventListener('click' , toggleClass);

        return () => {
            document.querySelector('.dropdown-btn').removeEventListener('click' , toggleClass);
        }
    },[])

    function handleSignOut() {
        signOut();
    }
    return ( 
        <>
        <div className="header">
            <div className="container">
                <div className="left-side">
                <h1>MyTasks</h1>
                <div className="nav">
                    <Link className={window.location.pathname == `/home/${user.id}` ? 'active' : ''} to={"/home/"+user.id} >Home</Link>
                    <Link to={"/allTasks/"+user.id}>All Tasks</Link>
                </div>

                </div>
                <div className="rigth-side">
                    {user 
                    ? 
                     <div className="user-detail">
                         <button className="dropdown-btn">
                            <h4 className="username">{user.username}</h4>
                            <span className="arrow-down"></span>
                         </button>
                         
                         <div className="dropdown dropdown-user">
                             <div className="signed">
                                 <h4>signed in as</h4>
                                 <p>{user.username}</p>
                             </div>
                             <div className="signe-out dropdown-item">
                                 <button onClick={handleSignOut} className="signOutBtn">Sign out</button>
                                 
                             </div>
                         </div>
                     </div>
                    :
                    <p>login</p>
                    }
                </div>
            </div>
        </div>
            
        <Outlet />
        </>
     );
}
 
export default Header;