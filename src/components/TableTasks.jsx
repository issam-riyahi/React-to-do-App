import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import { fetchToDo } from "../redux/toDo/toDoAction";
import { useParams } from "react-router-dom";



const TableTasks = (props) => {
    console.log(props);
    let allTasks= useSelector(state => state.task.data);
    let pending = useSelector(state => state.task.loading);
    const dispatch = useDispatch();
    const [search , setSearch] = useState('');
    const param = useParams();
   
    
    let rowElements = allTasks.map(row => {
        if(props.sectionId.id !== ""){
            
            if(row.section_id == props.sectionId.id){

                if(search !== ""){
                    if(row.title.toLowerCase().indexOf(search) > -1){
                        
                        return <TableRow {...row} key={row.task_id} />  
                    }
                }
                else {
                    return <TableRow {...row} key={row.task_id} />
                }
                
            }
        }
        else {

            if(search !== ""){
                if(row.title.toLowerCase().indexOf(search) > -1){
                    
                    return <TableRow {...row} key={row.task_id} />  
                }
            }
            else {
                return <TableRow {...row} key={row.task_id} />
            }
        }
    })
    

    function handleChange(e){

        setSearch(e.target.value);
    }

    useEffect(() => {
        dispatch(fetchToDo(param.userId))
    },[])
    return ( 

        <main className="tasks-table">
            <div className="container">
                <div className="head-bar">
                    <h1> {props.sectionId.id ? props.sectionId.title : 'All'} Tasks</h1>
                    <div className="search-input">
                        <label htmlFor="">Search by Title :</label>
                        <input 
                            type="text" 
                            name="title"
                            id="search"
                            onChange={(e)=>{handleChange(e)}}
                        />   
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Task Id</th>
                            <th>Task Title</th>
                            <th>Task section</th>
                            <th>Task Date</th>
                            <th>Done</th>
                            {/* <th>Status</th> */}
                            {/* <th>UserId</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {rowElements}
                    </tbody>
                </table>
            </div>    
        </main>

     );
}
 
export default TableTasks;