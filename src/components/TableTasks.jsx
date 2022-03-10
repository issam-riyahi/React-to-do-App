import { useEffect, useState } from "react";
import GetTasks from "../GolobalMethods/GetTasks";
import TableRow from "./TableRow";




const TableTasks = (props) => {
    // let {allTasks, isPending} = GetTasks();
    let allTasks= [...GetTasks()];
    

    const [search , setSearch] = useState('');

    // const [Tasks, setTasks] = useState(data);
    console.log(props.sectionId)

    // console.log(isPending)

    // if(!isPending){
    //     var rowElements = allTasks.map(row => {
    //         return <TableRow {...row} key={row.id} />
    //     })
    // }
    
        let rowElements = allTasks.map(row => {
            if(props.sectionId.id !== ""){
                
                if(row.section == props.sectionId.id){

                    if(search !== ""){
                        if(row.title.toLowerCase().indexOf(search) > -1){
                            
                            return <TableRow {...row} key={row.id} />  
                        }
                    }
                    else {
                        return <TableRow {...row} key={row.id} />
                    }
                    
                }
            }
            else {

                if(search !== ""){
                    if(row.title.toLowerCase().indexOf(search) > -1){
                        
                        return <TableRow {...row} key={row.id} />  
                    }
                }
                else {
                    return <TableRow {...row} key={row.id} />
                }
            }
        })
    

    function handleChange(e){

        setSearch(e.target.value);
    }
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