import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import { fetchToDo } from "../redux/toDo/toDoAction";
import { useParams } from "react-router-dom";
import { deletetoDo } from "../redux/toDo/toDoAction";
import usePrivateAxios from "../Hooks/usePrivateAxios";
import useAuth from "../Hooks/useAuth";

const TableTasks = (props) => {
    let allTasks= useSelector(state => state.task.data);
    let pending = useSelector(state => state.task.loading);
    const {user} = useAuth();
    const dispatch = useDispatch();
    const [search , setSearch] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    // const [notAllChecked, setNotAllChecked] = useState(true);
    
    const [selectedIds, setSelectedIds] = useState([]);
    const axiosPrivate = usePrivateAxios();
    const param = useParams();
    console.log(selectedIds);


    let rowElements = allTasks.map(row => {
        if(props.sectionId.id !== ""){
            
            if(row.section_id == props.sectionId.id){

                if(search !== ""){
                    if(row.title.toLowerCase().indexOf(search) > -1){
                        
                        return <TableRow 
                            {...{...row,selected: allChecked, selectedIds}} 
                            key={row.task_id} 
                            setIds={handleSetIds} 
                            handleAllCheckd={handleAllCheckd}
                        />  
                    }
                }
                else {
                    return <TableRow 
                        {...{...row,selected: allChecked, selectedIds}} 
                        key={row.task_id}  
                        setIds={handleSetIds}
                        handleAllCheckd={handleAllCheckd}
                     />
                }
                
            }
        }
        else {

            if(search !== ""){
                if(row.title.toLowerCase().indexOf(search) > -1){
                    
                    return <TableRow 
                        {...{...row,selected: allChecked, selectedIds}} 
                        key={row.task_id}   
                        setIds={handleSetIds}
                        handleAllCheckd={handleAllCheckd}
                    />  
                }
            }
            else {
                return <TableRow 
                        {...{...row,selected: allChecked, selectedIds}}
                        key={row.task_id}  
                        setIds={handleSetIds}
                        handleAllCheckd={handleAllCheckd} 
                />
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
        // console.log("Hook all Check");
        if(allChecked){
            // console.log("Hook all Check true");
            
            setSelectedIds(allTasks.map(task => task.task_id));
        }
        else{
            setSelectedIds([]);
        }
    },[allChecked]);




    function handleSubmit(e){
        e.preventDefault();
        if(selectedIds.length){
            dispatch(deletetoDo(selectedIds, user.userId, axiosPrivate))
            setSelectedIds([]);
        }
    }





    // useEffect(() => {
    //     if(selectedIds.length === allTasks.length){
    //         console.log(selectedIds.length ,  allTasks.length)
    //         setAllChecked(true);
            
    //     }
    //     else{
    //         setAllChecked(false);
    //         // setNotAllChecked(true);  
    //     }
        
    // },[selectedIds]);










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
                <div className="deleted-btn">
                    <form onSubmit={(e) =>{
                        handleSubmit(e);
                    }}>
                        <button className="delete">delete</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.length === allTasks.length ? true : false} 
                                    onChange={() => {setSelectedIds(selectedIds.length === allTasks.length ? [] : allTasks.map(task => task.task_id) )}}  
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