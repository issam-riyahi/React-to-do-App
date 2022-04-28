import { useEffect, useState } from "react";





const TableRow = (props) => {
    
    const [isChecked, setIsChecked] = useState(false);
    

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    }
    useEffect(()=>{
        setIsChecked(props.selected);
    },[props.selected])

    useEffect(()=>{
        
    },[])
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