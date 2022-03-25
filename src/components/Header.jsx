import { useEffect } from "react";
import { Link } from "react-router-dom";


const Header = () => {



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

    return ( 
        <div className="header">
            <h1>MyTasks</h1>
            <div className="nav">
                <Link className={window.location.pathname == "/" ? 'active' : ''} to="/">Home</Link>
                <Link to="allTasks">All Tasks</Link>
            </div>
        </div>
     );
}
 
export default Header;