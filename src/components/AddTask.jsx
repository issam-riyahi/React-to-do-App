import { useEffect, useState } from "react";
import GetFetch from "../GolobalMethods/GetFetch";
import UpdateFetch from "../GolobalMethods/UpdateFetch";

const AddTask = (prop) => {

    // const [section, setSection] = useState([]);
    let section = [...GetFetch("http://localhost:3001/sections")];
    console.log(section)
    const [taskData, setTaskData] = useState({
        title: "",
        section: "",
        doDate: "",
        done: false,
    })
    // useEffect(()=>{

    //     fetch("http://localhost:3001/sections")
    //     .then(res => res.json())
    //    .then(data => setSection(data) );
    // },[]);
    
    // setSection(GetFetch("http://localhost:3001/sections"))
    function addTaskClick(e){
        e.preventDefault();

        if(document.getElementById('task-title').value == 1){
            console.log(1);
        }
        
        if(taskData.title !== "" && taskData.section !== "" && taskData.doDate !== ""){
            // fetch("http://localhost:3001/Tasks",{
            //     method: 'POST',
            //     body: JSON.stringify(taskData),
            //     headers: { 'content-Type' : 'Application/json' }
            // })
            // .then(res => {
                
            //     prop.handleAddTask();
            // })
            // .catch(err => {
            //     console.log(err)
            // })
            UpdateFetch(null, "http://localhost:3001/Tasks",{
                method: 'POST',
                body: JSON.stringify(taskData),
                headers: { 'content-Type' : 'Application/json' }
            },prop.handleAddTask)
        }
        else {
            console.log("no")
        }
        
            
        }
     
        
        
    
    function handleChange(e){
        let { name , value } = e.target;
        setTaskData(oladTask => ({...oladTask, [name]: value}))

        
    }   
    let sectionElements = section.map(item => {
        return (
            <option key={item.id} value={item.id} >{item.name}</option>
        )
    })

    return ( 
        <div className="add-container">
            <div className="add-content">
                <div className="close">
                    <button 
                    className="btn-close"
                    onClick={prop.handleAddTask}
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