import { useEffect, useState } from "react";





const TableRow = (props) => {
    
    const [isChecked, setIdChecked] = useState(false);
    

    const handleCheckbox = () => {
        setIdChecked(!isChecked);
    }
    useEffect(()=>{
        setIdChecked(props.selected);
    },[props.selected])
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