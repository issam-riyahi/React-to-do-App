




const TableRow = (props) => {
    return ( 

        <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.section}</td>
            <td>{props.doDate}</td>
        </tr>
     );
}
 
export default TableRow;