import { useEffect, useState } from "react";


const GetTasks = () => {
    const [allTasks, setAllTasks] = useState();
    let [isPending, setIsPending] = useState(true);
    useEffect(()=> {
        const abortControl = new AbortController();
        fetch('http://localhost:3001/Tasks',{
            signal: abortControl.signal,
        })
        .then(res => res.json())
        .then(data => {
            setAllTasks(data)
            setIsPending(false);
        })

        return function cleanup(){
            console.log(2)
            abortControl.abort();
        }
    },[]);
    return ( {allTasks, isPending} );
}
 
export default GetTasks;