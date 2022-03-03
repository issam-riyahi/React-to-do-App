import { useEffect, useState } from "react";
import DoneIcon from "../icons/DoneIcon";


const Task = (prop) => {

    const [section, setSection] = useState({});
    let date = new Date(prop.doDate);
    
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]; 
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dateText = '';
    let style = {
        color: ""
    }
    if(date.getDate() === new Date().getDate()){
        dateText = 'Today';
        style.color = "rgb(63, 238, 238)"
    }
    else if(date.getDate() === new Date().getDate() + 1){
        dateText = "Tomorrow";
        style.color = "rgb(63, 238, 238)"
    }
    else if(date.getDate() < new Date().getDate() + 3){
        dateText = dayNames[date.getDate()];
    }
    else {
        dateText = `${month[date.getMonth()]}, ${date.getDate()}`;
    }


    useEffect(()=>{

        fetch("http://localhost:3001/sections")
        .then(res => res.json())
       .then(data => 

            data.forEach(item => {
                if(item.id ===  parseInt(prop.section) ){
                     setSection(item) ;
                }
            })
        );
    },[]);
    
    function UpdateTask(id) {

        fetch("http://localhost:3001/Tasks/"+id,{
            method: 'PUT',
            body: JSON.stringify({ id: id, title: prop.title , doDate: prop.doDate, section: prop.section , done: true}),
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

        
    

    const bgStyle = {
        backgroundColor: `${section.color}`
    }

    
    return ( 
        <div className="task">
            <div className="task-content">
                <div 
                className="task-name-icon" 
                // onClick={prop.doneTask} 
                onClick={ prop.done === false ?  () => [UpdateTask(prop.id),prop.doneTask(prop.id)] : ()=> {}} 

                >
                    <DoneIcon done={prop.done}  />
                    <p className="task-title">{prop.title}</p>
                </div>
                <div className="task-section-date">
                    <span 
                    className="section-task" 
                    style={bgStyle} 
                    >
                        {section.name}
                    </span>
                    <p className="date" style={ prop.done ? {} : style}>{dateText}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Task;