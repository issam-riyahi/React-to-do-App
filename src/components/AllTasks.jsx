import { useState } from "react";
import SectionNav from "./SectionNav";
import TableTasks from "./TableTasks";



const AllTasks = () => {

    const [sectionId, setSectionId] = useState({id: '' , title : ''});


    function handleSection(id, title){
        setSectionId({id: id , title : title});
    }
    console.log(sectionId); 
    return (  

        <div className="all-tasks-container">
        
           <SectionNav handleSection={handleSection} />
           <TableTasks sectionId ={sectionId} /> 


        </div>
    );
}
 
export default AllTasks;

