import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../Context/AuthProvider";
import { creatToDo } from "../redux/toDo/toDoAction";

const AddTask = (prop) => {
    const userContext = useAuth();
    const dispatch = useDispatch();
    const sections = useSelector(state => state.section);
    console.log(sections)
    const [taskData, setTaskData] = useState({
        title: "",
        section: "",
        doDate: "",
        status: {
            statusTag: "",
            color: "#333333",
        },
        done: false,
    })
    
    // useEffect(()=>{
    //     dispatch(getSection());
    // },[])
    function addTaskClick(e){
        e.preventDefault();

        if(document.getElementById('task-title').value == 1){
            console.log(1);
        }
        
        if(taskData.title !== "" && taskData.section !== "" && taskData.doDate !== ""){
           
            
            dispatch(creatToDo({...taskData, userId: userContext.user.id}));
            prop.handleAddTask('addTask');
        }
        else {
            console.log("no")
        }
        
            
    }
     
        
        
    
    function handleChange(e){
        let { name , value } = e.target;
        setTaskData(oladTask => (name == "statusTag" || name == "color"  ?  {...oladTask, status :{ ...oladTask.status , [name] : value } } : {...oladTask, [name] : value } ));

        
    }   
    let sectionElements = sections.data.allId.map(item => {
        return (
            <option key={item} value={item} >{sections.data.byId[item].name}</option>
        )
    })

    return ( 
        <div className="add-container">
            <div className="add-content">
                <div className="close">
                    <button 
                    className="btn-close"
                    onClick={() => prop.handleAddTask('addTask')}
                    >

                    <img className="icon i-close" src="./images/xmark.svg" alt="" />
                    </button>
                </div>
                <form>
                    <h2>Add Task</h2>
                    <div className="task-input-title input-scope">
                        <label htmlFor="">Task Title :</label>
                        <input 
                            type="text"
                            id="task-title" 
                            name="title" 
                            placeholder="Enter The Task Title" 
                            onChange={(e) => handleChange(e)}
                            value={taskData.title}
                        />
                    </div>
                    <div className="task-input-section input-scope">
                        <label htmlFor="">section :</label>
                        <select 
                            name="section" 
                            id=""
                            onChange={(e) => handleChange(e)}
                            // value={taskData.title}
                        >
                            <option value="">-- select section -- </option>
                            {sectionElements}
                        </select>
                    </div>
                    <div className="task-input-status input-scope">
                        <label htmlFor="">status :</label>
                        <input 
                            type="text"
                            id="task-title" 
                            name="statusTag" 
                            placeholder="Enter Tasks Status" 
                            onChange={(e) => handleChange(e)}
                            value={taskData.status.statusTag}
                        />
                        <input 
                            type="color"
                            name="color"
                            onChange={(e) => handleChange(e)}
                            value={taskData.status.color}
                        />
                    </div>
                    <div className="task-input-date input-scope">
                        <label htmlFor="">Do Date :</label>
                        <input 
                            type="date"
                            name="doDate"
                            onChange={(e) => handleChange(e)}
                            
                        />
                    </div>
                    
                    <div className="add-btn">

                    <button 
                        className="btn" 
                        onClick={(e) => addTaskClick(e)}
                    >
                        Add Task</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default AddTask;