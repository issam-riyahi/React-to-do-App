import { useState } from "react";



const AddSection = (prop) => {

    const [section, setSection] = useState({
        name: "",
        color: "#333",
    });

    function handleInputs(e){
        let { name , value} = e.target ;
        setSection(oldSection => ({...oldSection, [name]: value}))
    }

    function addSection(e){
        e.preventDefault();
        if(section.name !== ""){
            fetch('http://localhost:3001/sections',{
                method: 'POST',
                body: JSON.stringify(section),
                headers: { 'content-Type' : 'Application/json' }

            })
        }
    }

    return ( 
        <div className="add-container">
            <div className="add-content">
                <div className="close">
                    <button 
                    className="btn-close"
                    onClick={prop.handleAddSection}
                    >

                    <img className="icon i-close" src="./images/xmark.svg" alt="" />
                    </button>
                </div>
                <form>
                    <h2>Add Section</h2>
                    <div className="task-input-title input-scope">
                        <label htmlFor="">Task Name :</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter The Task Title" 
                            onChange={(e) => handleInputs(e)}
                            value={section.name}
                        />
                    </div>
                   
                    <div className="task-input-date input-scope">
                        <label htmlFor="">color :</label>
                        <input 
                            type="color"
                            name="color"
                            onChange={(e) => handleInputs(e)}
                            value={section.color}
                        />
                    </div>
                    
                    <div className="add-btn">

                    <button 
                        className="btn" 
                        onClick={(e) => addSection(e)}
                    >
                        Add Task</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default AddSection;
