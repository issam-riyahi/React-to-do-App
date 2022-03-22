import { useEffect, useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import AddSection from "./components/AddSection";
import {connect} from "react-redux";
import { fetchToDo } from "./redux/toDo/toDoAction";
import Laoding from "./components/Laoding";

const Home = ({fetchToDo, toDoData}) => {
    // let inSortedList = [];
    let [crudState, setCrudState] = useState({
        addTask: false,
        addSection: false,
        updateTask: false,
        deletedTask: false,
    });
    let dateNow = new Date();
    

    // useEffect(()=> {
    //     const abortControl = new AbortController();
    //     fetch('http://localhost:3001/Tasks',{
    //         signal: abortControl.signal,
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setAllTasks(data)
    //         setIsPending(false);
    //     })

    //     return function cleanup(){
    //         console.log(2)
    //         abortControl.abort();
    //     }
    // },[crudState]);

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
        

        // console.log('inside')
        function addClasses(index, item){

            item.classList.toggle('active');
            addAttribute(index);
            // console.log(index, item)
        }

       

        // if(document.querySelector('.tasks-list') !== null){

            
                // console.log(document.querySelectorAll('.task-time'))
                document.querySelectorAll('.task-time').forEach((item, index) => {
                    // item.addEventListener('click',addAttribute.bind(this,index));
                    var hadnelCopy = addClasses.bind(null,index,item);
                    // console.log(item);
                    item.addEventListener('click',hadnelCopy);
                    // item.addEventListener('click',testClick);
                    
                })
                // return function cleanup() 
                // {
                    
                //     console.log(2);
                //     document.querySelectorAll('.task-time').forEach((item, index) => {
                //         // var hadnelCopy = addClasses.bind(null,index,item);
                //         // item.removeEventListener('click',hadnelCopy);
                        
                //         // console.log(hadnelCopy);
                //     })
                // };
        // }
            
        
    },[fetchToDo.laoding]);

    function handleAddTask() {
        setCrudState(oldvalue => ({...oldvalue , addTask: !oldvalue.addTask }))
    }
    function handleAddSection() {
        setCrudState(oldvalue => ({...oldvalue , addSection: !oldvalue.addSection }))
    }
  


    function handleCrudState(method){
        // if(method === 'addTask'){
            setCrudState(oldvalue => ({...oldvalue , [method]: !oldvalue.addTask }))
        // }
        // else if(method === 'addSection'){
        //     setCrudState(oldvalue => ({...oldvalue , addSection: !oldvalue.addSection }))
        // }
        // else if(method === 'updateTask'){
        //     setCrudState(oldvalue => ({...oldvalue , updateTask: !oldvalue.updateTask }))
        // }
        // else if(method === 'deleteTask') {
        //     setCrudState(oldvalue => ({...oldvalue , deletedTask: !oldvalue.deletedTask }))
        // }
    }
    function doneTask(id) {
        setAllTasks(oldvalue => (
            oldvalue.map(task => task.id === id ? ({...task, done: true}) : task)
        ))
    }

    
    let tasksObject = filterTasks(toDoData.data);

    function filterTasks(tasksData){
       return tasksData.reduce((prevItem,currentitem)=>{
            if(currentitem.done === false){
    
                let taskDate = new Date(currentitem.doDate);
    
                if(taskDate.getDate() === dateNow.getDate() ){
                    // prevItem.todayTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={()=> doneTask(currentitem.id) } />);
                    prevItem.todayTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={doneTask} handleCrudState={handleCrudState} />);
                }
                else if(taskDate.getDate() === dateNow.getDate() + 1){
                    // prevItem.tomorrowTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={()=> doneTask(currentitem.id) } />);
                    prevItem.tomorrowTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ doneTask } handleCrudState={handleCrudState}  />);
                }
                else if(taskDate.getTime() > dateNow.getTime() + 1000 * 60 * 60 * 24) {
                    // prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ ()=> doneTask(currentitem.id) } />);
                    prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ doneTask} handleCrudState={handleCrudState}  />);
                    // inSortedList.push(currentitem);
                }
                else {
                    prevItem.tasksNotDone.push(<Task {...currentitem} key={currentitem.id} doneTask={ doneTask} handleCrudState={handleCrudState}  />);
                }
            }
            else{
                prevItem.doneTask.push(<Task {...currentitem} key={currentitem.id} handleCrudState={handleCrudState}  />);
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

//     function sortingList(list){
//         let sort = true ;
//         let arr = list;
//         if(arr.length > 0 ){
//         while(sort){
                
//             for(let i = 0 ; i < arr.length - 1  ; i += 1  ){
//                 console.log(i)
                
//             let currentDate = new Date(arr[i].doDate).getTime();
//             let nextDate = new Date(arr[i + 1].doDate).getTime();

//                 if(currentDate > nextDate ){
//                     let temp = arr[i] ;
//                     arr[i] = arr[i + 1];
//                     arr[i + 1] = temp;
//                     sort = true ;
//                 }
//                 sort = false ;
//             }
//         }
        
        
//         return arr;

//     }
// }
//     let sortUpcoingList = sortingList(inSortedList);
//     console.log(sortUpcoingList);

    // console.log(inSortedList)

    useEffect(()=>{
        fetchToDo();
    },[])

    return ( 

        <>
        { crudState.addTask &&  <AddTask handleAddTask={handleAddTask} />}
        
        { crudState.addSection &&  <AddSection handleAddSection={handleAddSection} />}
        <div className="container-task">
            <div className="add">
                <span 
                    className="add-task" 
                    onClick={handleAddTask}
                >
                    Add Task
                </span>
                <span 
                    className="add-section"
                    onClick={handleAddSection}
                > Add Section</span>
            </div>
            <div className="tasks">
                <div className="new-tasks">
                    <div className={`task-time ${tasksObject.tomorrowTasks.length ? 'active' : ''}`}>
                        <h3>New Tasks</h3>  
                    </div>
                    <div className={`tasks-list  ${ toDoData.laoding ? '' : tasksObject.tomorrowTasks.length  ? ''  : 'up-animate'}`}>
                        
                        
                        {toDoData.laoding  ? <Laoding /> : tasksObject.tomorrowTasks.length ?  tasksObject.tomorrowTasks : <div className="no-data">No Tasks </div> }
                    </div>
                </div>
                <div className="today-tasks">
                    <div className={`task-time ${tasksObject.todayTasks.length ? 'active' : ''}`}>
                        <h3>Today Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.laoding ? '' : tasksObject.todayTasks.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.laoding  ? <Laoding /> : tasksObject.todayTasks.length ? tasksObject.todayTasks : <div className="no-data">No Tasks </div> }                    
                    </div>
                </div>
                <div className="upcoming-tasks">
                    <div className={`task-time ${tasksObject.upcomingTasks.length  ? 'active' : ''}`}>
                        <h3>Upcoming Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.laoding ? '' : tasksObject.upcomingTasks.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.laoding  ? <Laoding /> : tasksObject.upcomingTasks.length ? tasksObject.upcomingTasks : <div className="no-data">No Tasks </div> }  
                    </div>
                    
                </div>
                <div className="done-tasks">
                    <div className={`task-time ${tasksObject.doneTask.length ? 'active' : ''}`}>
                        <h3>Done Tasks</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.laoding ? '' : tasksObject.doneTask.length  ? ''  : 'up-animate'} `}>
                    {toDoData.laoding  ? <Laoding /> : tasksObject.doneTask.length ? tasksObject.doneTask : <div className="no-data">No Tasks </div> }    
                    </div>
                    
                </div>
                <div className="not-done-tasks">
                    <div className={`task-time ${tasksObject.tasksNotDone.length ? 'active' : ''}`}>
                        <h3>Tasks not Done</h3>
                    </div>
                    <div className={`tasks-list ${ toDoData.laoding ? '' : tasksObject.tasksNotDone.length  ? ''  : 'up-animate'} `}>
                    
                    {toDoData.laoding  ? <Laoding /> : tasksObject.tasksNotDone.length ? tasksObject.tasksNotDone : <div className="no-data">No Tasks </div> }     
                    </div>
                    
                </div>
            </div>
        </div> 
        
        
        </>
        // <h1>Hello, World</h1>
     );
}

const mapStateToProp = (state) =>{
    return {
        toDoData: state,
    }
}
const mapDispatchToProp = (dispatch) => {

    return {
        fetchToDo : () => dispatch(fetchToDo()),
    }

}
export default connect(mapStateToProp, mapDispatchToProp)(Home)  ;