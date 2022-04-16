import { useEffect, useState } from "react";
import DoneIcon from "../icons/DoneIcon";
import Pen from "../icons/Pen";
import Trash from "../icons/Trash";
import Check from "../icons/Check";
import { connect, useSelector } from "react-redux";
import { deletetoDo, updateTask } from "../redux/toDo/toDoAction";

const Task = (prop) => {
    console.log(prop)
    // const [section, setSection] = useState({});
    let section = useSelector(state => state.section.data);
    // console.log(section);
    let TaskSection = section.byId[prop.section_id] || {name: "" , color: ""};
    // console.log(section)
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

    
   

    function handleUpdate() {
        setUpdate(oldValue => !oldValue);
    }  
    
    function handelInput(e){

        let {name, value} = e.target;
        setUpdatedData(oldValues => ({...oldValues, [name]: value}));
    }
    
    let sectionElements = section.allId.map(item => {

        return (
            <option key={item} value={section.byId[item].section_id} >{section.byId[item].name}</option>
        )
    })
    const bgStyle = {
        backgroundColor: `${TaskSection.color}`
    }

    // useEffect(()=>{
    //     if(update == true){
    //         document.addEventListener('click',handleUpdate); 
    //     }
    //     return () => {
            
    //         document.removeEventListener('click', handleUpdate);
    //     }
    // },[update])
    return ( 

        
            <div className="task">
            <div className="task-content">
                <div className="task-name-icon">
                 
                
                 

                
                    <div 
                        className="click-icon"   

                            onClick={()=> { prop.done == 0 ?  prop.updateTask({ id: prop.task_id, title: prop.title , doDate: prop.doDate, section: prop.section_id , done: 1, userId:prop.user_id}) : ()=>{}}}
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
                        {sectionElements}
                    </select>  

                    :   <span 
                            className="section-task" 
                            style={bgStyle} 
                        >
                            {TaskSection.name}
                        </span>
                    }
                    <p className="date" style={ !prop.done ? {} : style}>{dateText}</p>
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
                            ? () => [prop.updateTask({ id: prop.task_id, title: updatedData.title , doDate: prop.doDate, section: updatedData.section , done: prop.done ,userId:prop.user_id}),handleUpdate(),prop.handleCrudState('updateTask')] 
                            : ()=>{handleUpdate()}}
                    >
                        <Check />
                    </span>}
                    <span 
                    
                        className="delete"
                        onClick={() => [prop.deleteToDo({id:prop.task_id , userId:prop.user_id }),prop.handleCrudState('deletedTask')]}
                    >
                        <Trash />    
                    </span>
                   

                </div>
                </div>
            </div>
        </div>
    
        
     );
}
// const mapStateToProp = (state) =>{
//     return {
//         toDoData: state,
//     }
// }
const mapDispatchToProp = (dispatch) => {

    return {
        
        updateTask : (task) =>  dispatch(updateTask(task)) ,
        deleteToDo : (taskId) => dispatch(deletetoDo(taskId)),
    }

}
export default connect(null, mapDispatchToProp) (Task);