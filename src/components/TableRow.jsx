import { useEffect, useState } from "react";





const TableRow = (props) => {
    
    const [isChecked, setIsChecked] = useState(props.selected);
    

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    }
    useEffect(()=>{

        if(props.selectedIds.length == props.tasksLength  ){
            setIsChecked(true);
            
        }
        else if(props.selectedIds.length == 0  ){
            setIsChecked(false);
        }
        
    },[props.selectedIds])

    // useEffect(()=>{
    //     if(!isChecked){
    //         props.handleNotAllCheckd(true)
    //     }
        
    // },[isChecked])
    return ( 

        <tr>
            <td><input 
                type="checkbox" 
                checked={isChecked} 
                value={props.task_id}  
                onChange={() => {props.setIds(props.task_id), handleCheckbox()}}  
            /></td>
            <td>{props.task_id}</td>
            <td>{props.title}</td>
            <td>{props.section_id}</td>
            <td>{props.doDate}</td>
            <td>{props.done ? "true" : 'false'}</td>
            {/* <td>{props.userId}</td> */}
        </tr>
     );
}
 
export default TableRow;