import { useEffect, useState } from "react";


const AddTask = (prop) => {

    const [section, setSection] = useState([]);
    
    const [taskData, setTaskData] = useState({
        title: "",
        section: "",
        doDate: "",
        done: false,
    })
    useEffect(()=>{

        fetch("http://localhost:3001/sections")
        .then(res => res.json())
       .then(data => setSection(data) );
    },[]);
    
    function addTaskClick(e){
        e.preventDefault();
        if(taskData.title !== "" && taskData.section !== "" && taskData.doDate !== ""){
            fetch("http://localhost:3001/Tasks",{
                method: 'POST',
                body: JSON.stringify(taskData),
                headers: { 'content-Type' : 'Application/json' }
            })
            .then(res => {
                
                prop.handleAddTask();
            })
            .catch(err => {
                console.log(err)
            })
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
                            value={taskData.title}
                        >
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