import { useEffect, useState } from "react";
import GetTasks from "../GolobalMethods/GetTasks";
import TableRow from "./TableRow";




const TableTasks = () => {
    let {allTasks, isPending} = GetTasks();
    // console.log(data)
    // const [Tasks, setTasks] = useState(data);
    // console.log(Tasks)

    console.log(isPending)

    if(!isPending){
        var rowElements = allTasks.map(row => {
            return <TableRow {...row} key={row.id} />
        })
    }

    
    return ( 

        <div className="tasks-table">
            <div className="container">
                <h1>Tasks Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Task Id</th>
                            <th>Task Title</th>
                            <th>Task section</th>
                            <th>Task Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowElements}
                    </tbody>
                </table>
            </div>    
        </div>

     );
}
 
export default TableTasks;