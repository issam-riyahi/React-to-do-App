import { useEffect, useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import AddSection from "./components/AddSection";


const App = () => {

   
    const [allTasks, setAllTasks] = useState([]);
    let [isPending, setIsPending] = useState(true);
    let [crudState, setCrudState] = useState({
        addTask: false,
        addSection: false,
        updateTask: false,
        deletedTask: false,
    });
    let dateNow = new Date();
    
    console.log(crudState);

    useEffect(()=> {
        fetch('http://localhost:3001/Tasks')
        .then(res => res.json())
        .then(data => {
            setAllTasks(data)
            setIsPending(false);
        })
    },[crudState]);

    function addAttribute(index){

        // document.querySelectorAll('.tasks-list')[index].style.maxHeight = document.querySelectorAll('.tasks-list')[index].offsetHeight ;
        
        if(document.querySelectorAll('.tasks-list')[index].classList.contains("up-animate")){

            

            document.querySelectorAll('.tasks-list')[index].className = "tasks-list down-animate";
        }
        else {
            document.querySelectorAll('.tasks-list')[index].className = "tasks-list up-animate"
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
            
        
    },[isPending]);

    function handleAddTask() {
        setCrudState(oldvalue => ({...oldvalue , addTask: !oldvalue.addTask }))
    }
    function handleAddSection() {
        setCrudState(oldvalue => ({...oldvalue , addSection: !oldvalue.addSection }))
    }
    function handleUpdateTask() {
        setCrudState(oldvalue => ({...oldvalue , updateTask: !oldvalue.updateTask }))
    }
    function handleDeleteTask() {
        setCrudState(oldvalue => ({...oldvalue , deletedTask: !oldvalue.deletedTask }))
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

    let tasksObject;
    tasksObject = allTasks.reduce((prevItem,currentitem)=>{
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
            else if(taskDate.getDate() > dateNow.getDate() + 1) {
                // prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ ()=> doneTask(currentitem.id) } />);
                prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} doneTask={ doneTask} handleCrudState={handleCrudState}  />);
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

    // function sortingList(list){
    //     let sort = true ;
    //     let arr = [];
    //     if(list.length > 0 ){
    //     //     while(sort){
    //     //     for(let i = 0 ; i < list.length - 1  ; i += 1  ){
    //     //         sort = false ;
    //         let currentDate = new Date(list[0].doDate).getDate();
    //         let nextDate = new Date(list[1].doDate).getDate();
    //         if(currentDate < nextDate ){
    //             arr.push(list[0]);
    //             // sort = true ;
    //         }
    //         else {
    //             arr.push(list[1]);
    //             // sort = true ;
    //         }

    //         }
    //     // }
    //     // }
        
        
    //     return arr;

    // }
    // let sortUpcoingList = sortingList(allTasks);

    // console.log(sortUpcoingList)
    return ( 

        <>
        { crudState.addTask &&  <AddTask handleAddTask={handleAddTask} />}
        
        { crudState.addSection &&  <AddSection handleAddSection={handleAddSection} />}
        <Header />
    {  !isPending  ?  <div className="container-task">
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
                    <div className={`tasks-list ${tasksObject.tomorrowTasks.length ? '' : 'up-animate'}`}>
                        
                        {tasksObject.tomorrowTasks.length ? tasksObject.tomorrowTasks : <div className="no-data">No Tasks </div>}
                    </div>
                </div>
                <div className="today-tasks">
                    <div className={`task-time ${tasksObject.todayTasks.length ? 'active' : ''}`}>
                        <h3>Today Tasks</h3>
                    </div>
                    <div className={`tasks-list ${tasksObject.todayTasks.length ? '' : 'up-animate'}`}>
                    {tasksObject.todayTasks.length ? tasksObject.todayTasks : <div className="no-data">No Tasks </div>}
                        
                    </div>
                </div>
                <div className="upcoming-tasks">
                    <div className={`task-time ${tasksObject.upcomingTasks.length  ? 'active' : ''}`}>
                        <h3>Upcoming Tasks</h3>
                    </div>
                    <div className="tasks-list">
                    {tasksObject.upcomingTasks.length ? tasksObject.upcomingTasks : <div className="no-data">No Tasks </div>}
                        
                    </div>
                    
                </div>
                <div className="done-tasks">
                    <div className={`task-time ${tasksObject.doneTask.length ? 'active' : ''}`}>
                        <h3>Done Tasks</h3>
                    </div>
                    <div className="tasks-list">
                    {tasksObject.doneTask.length ? tasksObject.doneTask : <div className="no-data">No Tasks </div>}
                        
                    </div>
                    
                </div>
                <div className="not-done-tasks">
                    <div className={`task-time ${tasksObject.tasksNotDone.length ? 'active' : ''}`}>
                        <h3>Tasks not Done</h3>
                    </div>
                    <div className="tasks-list">
                    {tasksObject.tasksNotDone.length ? tasksObject.tasksNotDone : <div className="no-data">No Tasks </div>}
                        
                    </div>
                    
                </div>
            </div>
        </div> 
        :
        <div>Loading...</div>
        }
        </>
        // <h1>Hello, World</h1>
     );
}
 
export default App;