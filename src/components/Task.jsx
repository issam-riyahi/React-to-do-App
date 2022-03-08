import { useEffect, useState } from "react";
import DoneIcon from "../icons/DoneIcon";
import UpdateFetch from "../GolobalMethods/UpdateFetch";
import Pen from "../icons/Pen";
import Trash from "../icons/Trash";
import Check from "../icons/Check";
import GetFetch from "../GolobalMethods/GetFetch";
const Task = (prop) => {

    // const [section, setSection] = useState({});
    let section = [...GetFetch("http://localhost:3001/sections")];
    let TaskSection = "";
    const [update, setUpdate] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        title: prop.title,
        section: prop.section,
    });
    
    
    

    function setupDate(){
        
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
        else if(date.getDate() < new Date().getDate() + 3 && date.getDate() >= new Date().getDate()){
            dateText = dayNames[date.getDay()];
        }
        else {
            dateText = `${month[date.getMonth()]}, ${date.getDate()}`;
        }

        return {
            dateText,
            style
        }
    }


    let {dateText, style} = setupDate();

    
    // useEffect(()=>{

    //     fetch("http://localhost:3001/sections")
    //     .then(res => res.json())
    //    .then(data => 

    //         data.forEach(item => {
    //             if(item.id ===  parseInt(prop.section) ){
    //                  setSection(item) ;
    //             }
    //         })
    //     );
    // },[]);
    
    // function UpdateTask(id) {

    //     fetch("http://localhost:3001/Tasks/"+id,{
    //         method: 'PUT',
    //         body: JSON.stringify({ id: id, title: prop.title , doDate: prop.doDate, section: prop.section , done: true}),
    //         headers: {
    //             'Content-Type': 'application/json',
    //           },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

    function handleUpdate() {
        setUpdate(oldValue => !oldValue);
    }  
    
    function handelInput(e){

        let {name, value} = e.target;
        setUpdatedData(oldValues => ({...oldValues, [name]: value}));
    }
    
    let sectionElements = section.map(item => {

        if(item.id === parseInt(prop.section) ){
            TaskSection = item;
        }

        return (
            <option key={item.id} value={item.id} >{item.name}</option>
        )
    })
    const bgStyle = {
        backgroundColor: `${TaskSection.color}`
    }

    
    return ( 

        
            <div className="task">
            <div className="task-content">
                <div className="task-name-icon">
                 
                
                 

                
                    <div 
                        className="click-icon"
                         onClick={ prop.done === false ?  () => [UpdateFetch(prop.id, {
                            method: 'PUT',
                            body: JSON.stringify({ id: prop.id, title: prop.title , doDate: prop.doDate, section: prop.section , done: true}),
                            headers: {
                                'Content-Type': 'application/json',
                              },
                        }),prop.doneTask(prop.id)] : ()=> {}}       
                    >
                        
                        <DoneIcon done={prop.done}  />

                    </div>

                    { update 

                    ?   <input 
                            type="text" 
                            name="title" 
                            id="" 
                            value={updatedData.title} 
                            onChange = {(e) => handelInput(e)}
                        />

                    : <p className="task-title">{prop.title}</p> }

                </div>
                <div className="task-section-date">
                    { update 
                ?   <select 
                        className="Update-select"
                        name="section" 
                        id=""
                        onChange={(e) => handelInput(e)}
                        value={updatedData.section}
                    >
                    <option value="">-- select section -- </option>
                        {sectionElements}
                    </select>  

                    :    <span 
                        className="section-task" 
                        style={bgStyle} 
                        >
                            {TaskSection.name}
                        </span>
                    }
                    <p className="date" style={ prop.done ? {} : style}>{dateText}</p>
                <div className="crud">

                    {  !update ? 
                    
                    <span 
                    
                        className="update"
                        onClick={() => {handleUpdate();prop.handleCrudState('updateTask')}}
                    >
                        <Pen />
                    </span>
                    :
                    <span 
                    
                        className="Complete-update"
                        onClick={(prop.title !== updatedData.title || prop.section !== updatedData.section ) 
                            ? () => [UpdateFetch(prop.id,
                            {
                                method: 'PUT',
                                body: JSON.stringify({ id: prop.id, title: updatedData.title , doDate: prop.doDate, section: updatedData.section , done: prop.done}),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }),handleUpdate(),prop.handleCrudState('updateTask')] 
                            : handleUpdate}
                    >
                        <Check />
                    </span>}
                    <span 
                    
                        className="delete"
                        onClick={() => UpdateFetch(prop.id,
                            {
                                method: 'DELETE',
                               
                                
                            }, prop.handleCrudState)}
                    >
                        <Trash />    
                    </span>
                   

                </div>
                </div>
            </div>
        </div>
    
        
     );
}
 
export default Task;