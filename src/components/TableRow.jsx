




const TableRow = (props) => {
    return ( 

        <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.section}</td>
            <td>{props.doDate}</td>
            <td>{props.done ? "true" : 'false'}</td>
            {/* <td>{props.userId}</td> */}
        </tr>
     );
}
 
export default TableRow;