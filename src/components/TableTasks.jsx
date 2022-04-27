import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import { fetchToDo } from "../redux/toDo/toDoAction";
import { useParams } from "react-router-dom";



const TableTasks = (props) => {
    let allTasks= useSelector(state => state.task.data);
    let pending = useSelector(state => state.task.loading);
    const dispatch = useDispatch();
    const [search , setSearch] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const param = useParams();
    const setIds = new Set();
    // console.log(allChecked);


    let rowElements = allTasks.map(row => {
        // console.log('111111111111111111111');
        if(props.sectionId.id !== ""){
            
            if(row.section_id == props.sectionId.id){

                if(search !== ""){
                    if(row.title.toLowerCase().indexOf(search) > -1){
                        
                        return <TableRow {...{...row,selected: allChecked}} key={row.task_id} setIds={handleSetIds} />  
                    }
                }
                else {
                    return <TableRow {...{...row,selected: allChecked}} key={row.task_id}  setIds={handleSetIds} />
                }
                
            }
        }
        else {

            if(search !== ""){
                if(row.title.toLowerCase().indexOf(search) > -1){
                    
                    return <TableRow {...{...row,selected: allChecked}} key={row.task_id}   setIds={handleSetIds}/>  
                }
            }
            else {
                return <TableRow {...{...row,selected: allChecked}} key={row.task_id}  setIds={handleSetIds} />
            }
        }
    })

    function handleSetIds(id){
        if(selectedIds.includes(id)){
            setSelectedIds(prevValues => {
                return prevValues.filter(selectedid => {
                    if(selectedid !== id){
                        return selectedid;
                    }
                } )
            })
        }
        else{
            setSelectedIds(prevValues => [...prevValues, id]);
        }
    }

    function handleChange(e){

        setSearch(e.target.value);
    }

    function handleAllCheckd(){
        setAllChecked(!allChecked);
        
        
    }
    useEffect(() => {
        dispatch(fetchToDo(param.userId))
    },[])

    useEffect(() => {
        if(allChecked){
            
            setSelectedIds(allTasks.map(task => task.task_id));
        }
        else{
            setSelectedIds([]);
        }
    },[allChecked])
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
                            <th>
                                <input 
                                    type="checkbox" 
                                    checked={allChecked} 
                                    onChange={() => handleAllCheckd()}  
                                />
                            </th>
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