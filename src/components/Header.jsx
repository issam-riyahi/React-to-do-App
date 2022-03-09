import { Link } from "react-router-dom";


const Header = () => {
    return ( 
        <div className="header">
            <h1>My Tasks in Note App</h1>
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="allTasks">All Tasks</Link>
            </div>
        </div>
     );
}
 
export default Header;