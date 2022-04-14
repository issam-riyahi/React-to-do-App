import { useEffect, useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import AddSection from "./components/AddSection";
import {connect} from "react-redux";
import { fetchToDo } from "./redux/toDo/toDoAction";
import { getSection } from "./redux/section/sectionAction";
import Laoding from "./components/Loading";
import  useAuth from "./Hooks/useAuth";

const Home = ({fetchToDo, getSection, toDoData}) => {

    console.log(toDoData);
    console.log(toDoData);
    const {user} = useAuth();
    let tasksObject = [];
    let [crudState, setCrudState] = useState({
        addTask: false,
        addSection: false,
        updateTask: false,
        deletedTask: false,
    });
    let dateNow = new Date();
    

    function addAttribute(index){

        const taskList = document.querySelectorAll('.tasks-list');
        
        if(taskList[index].classList.contains("up-animate")){

            

            taskList[index].className = "tasks-list down-animate";
        }
        else {
            taskList[index].className = "tasks-list up-animate"
        }
        
    }
    useEffect(()=>{
        

        function addClasses(index, item){
            item.classList.toggle('active');
            addAttribute(index);
        }   

        document.querySelectorAll('.task-time').forEach((item, index) => {
            var hadnelCopy = addClasses.bind(null,index,item);
            item.addEventListener('click',hadnelCopy);
            
        })
    },[]);

    


    function handleCrudState(method){
            setCrudState(oldvalue => ({...oldvalue , [method]: !oldvalue[method] }))
    }
    
    // const userIdTasks =  toDoData.data.filter(task => task.userId == userContext.user.id);
    
    tasksObject = filterTasks(toDoData.data);

    function filterTasks(tasksData){
       return tasksData.reduce((prevItem,currentitem,index)=>{
            if(currentitem.done == false){
    
                let taskDate = new Date(currentitem.doDate);
    
                if(taskDate.getDate() === dateNow.getDate() ){
                    // prevItem.todayTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={()=> doneTask(currentitem.id) } />);
                    prevItem.todayTasks.push(<Task {...currentitem} key={index}  handleCrudState={handleCrudState} />);
                }
                else if(taskDate.getDate() === dateNow.getDate() + 1){
                    // prevItem.tomorrowTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={()=> doneTask(currentitem.id) } />);
                    prevItem.tomorrowTasks.push(<Task {...currentitem} key={index}  handleCrudState={handleCrudState}  />);
                }
                else if(taskDate.getTime() > dateNow.getTime() + 1000 * 60 * 60 * 24) {
                    // prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ ()=> doneTask(currentitem.id) } />);
                    prevItem.upcomingTasks.push(<Task {...currentitem} key={index}  handleCrudState={handleCrudState}  />);
                    // inSortedList.push(currentitem);
                }
                else {
                    prevItem.tasksNotDone.push(<Task {...currentitem} key={index}  handleCrudState={handleCrudState}  />);
                }
            }
            else{
                prevItem.doneTask.push(<Task {...currentitem} key={index} handleCrudState={handleCrudState}  />);
            }
            
    
            return prevItem;
        },{
            todayTasks : [],
            tomorrowTasks : [],
            upcomingTasks: [],
            doneTask: [],
            tasksNotDone: [],
        });
    }



    useEffect(()=>{
        fetchToDo(user.userId, true);
        getSection(user.userId);
    },[])

    return ( 

        <>
        { crudState.addTask &&  <AddTask handleAddTask={handleCrudState} />}
        
        { crudState.addSection &&  <AddSection handleAddSection={handleCrudState} />}
        <div className="container-task">
            <div className="add">
                <span 
                    className="add-task" 
                    onClick={() =>  handleCrudState('addTask')}
                >
                    Add Task
                </span>
                <span 
                    className="add-section"
                    onClick={() =>  handleCrudState('addSection')}
                > Add Section</span>
            </div>
            <div className="tasks">
                <div className="new-tasks">
                    <div className={`task-time ${tasksObject.tomorrowTasks.length ? 'active' : ''}`}>
                        <h3>New Tasks</h3>  
                    </div>
                    <div className={`tasks-list  ${ toDoData.loading ? '' : tasksObject.tomorrowTasks.length  ? ''  : 'up-animate'}`}>
                        
                        
                        {toDoData.loading  ? <Laoding /> : tasksObject.tomorrowTasks.length ?  tasksObject.tomorrowTasks : <div className="no-data">No Tasks </div> }
                    </div>
                </div>
                <div className="today-tasks">
                    <div className={`task-time ${tasksObject.todayTasks.length ? 'active' : ''}`}>
                        <h3>Today Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.loading ? '' : tasksObject.todayTasks.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.loading  ? <Laoding /> : tasksObject.todayTasks.length ? tasksObject.todayTasks : <div className="no-data">No Tasks </div> }                    
                    </div>
                </div>
                <div className="upcoming-tasks">
                    <div className={`task-time ${tasksObject.upcomingTasks.length  ? 'active' : ''}`}>
                        <h3>Upcoming Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.loading ? '' : tasksObject.upcomingTasks.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.loading  ? <Laoding /> : tasksObject.upcomingTasks.length ? tasksObject.upcomingTasks : <div className="no-data">No Tasks </div> }  
                    </div>
                    
                </div>
                <div className="done-tasks">
                    <div className={`task-time ${tasksObject.doneTask.length ? 'active' : ''}`}>
                        <h3>Done Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.loading ? '' : tasksObject.doneTask.length  ? ''  : 'up-animate'} `}>
                    {toDoData.loading  ? <Laoding /> : tasksObject.doneTask.length ? tasksObject.doneTask : <div className="no-data">No Tasks </div> }    
                    </div>
                    
                </div>
                <div className="not-done-tasks">
                    <div className={`task-time ${tasksObject.tasksNotDone.length ? 'active' : ''}`}>
                        <h3>Tasks not Done</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.loading ? '' : tasksObject.tasksNotDone.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.loading  ? <Laoding /> : tasksObject.tasksNotDone.length ? tasksObject.tasksNotDone : <div className="no-data">No Tasks </div> }     
                    </div>
                    
                </div>
            </div>
        </div> 
        
        
        </>
     );
}

const mapStateToProp = (state) =>{
    return {
        toDoData: state.task,
    }
}
const mapDispatchToProp = (dispatch) => {

    return {
        fetchToDo : (userId) => dispatch(fetchToDo(userId)),
        getSection : (userId) => dispatch(getSection(userId)),
    }

}
export default connect(mapStateToProp, mapDispatchToProp)(Home)  ;