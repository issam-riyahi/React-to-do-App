import { useEffect, useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import AddSection from "./components/AddSection";


const App = () => {

   
    const [allTasks, setAllTasks] = useState([]);
    let [isPending, setIsPending] = useState(true);
    let [add, setAdd] = useState({
        addTask: false,
        addSection: false,
    });
    let dateNow = new Date();
    
    console.log(add)
    useEffect(()=> {
        fetch('http://localhost:3001/Tasks')
        .then(res => res.json())
        .then(data => {
            setAllTasks(data)
            setIsPending(false);
        })
    },[add]);

    function handleAddTask(){
        setAdd(oldvalue => ({...oldvalue , addTask: !oldvalue.addTask }))
    }
    function handleAddSection(){
        setAdd(oldvalue => ({...oldvalue , addSection: !oldvalue.addSection }))
    }

    let tasksObject;
    tasksObject = allTasks.reduce((prevItem,currentitem)=>{
        if(currentitem.done === false){

            let taskDate = new Date(currentitem.doDate);

            if(taskDate.getDate() === dateNow.getDate() ){
                prevItem.todayTasks.push(<Task {...currentitem} key={currentitem.id} />);
            }
            else if(taskDate.getDate() === dateNow.getDate() + 1){
                prevItem.tomorrowTasks.push(<Task {...currentitem} key={currentitem.id} />);
            }
            else if(taskDate.getDate() > dateNow.getDate() + 1) {
                prevItem.upcomingTasks.push(<Task {...currentitem} key={currentitem.id} />);
            }
        }
        

        return prevItem;
    },{
        todayTasks : [],
        tomorrowTasks : [],
        upcomingTasks: [],
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
        { add.addTask &&  <AddTask handleAddTask={handleAddTask} />}
        { add.addSection &&  <AddSection handleAddSection={handleAddSection} />}
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
                    <div className="task-time">
                        <h3>New Tasks</h3>  
                    </div>
                    <div className="tasks-list">
                        
                        {tasksObject.tomorrowTasks}
                    </div>
                </div>
                <div className="today-tasks">
                    <div className="task-time">
                        <h3>Today Tasks</h3>
                    </div>
                    <div className="tasks-list">
                        {tasksObject.todayTasks}
                        
                    </div>
                </div>
                <div className="upcoming-tasks">
                    <div className="task-time">
                        <h3>Upcoming Tasks</h3>
                    </div>
                    <div className="tasks-list">
                        {tasksObject.upcomingTasks}
                        
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