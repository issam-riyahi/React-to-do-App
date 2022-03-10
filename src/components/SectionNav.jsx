import GetFetch from "../GolobalMethods/GetFetch";


const SectionNav = (props) => {

    let section = [...GetFetch("http://localhost:3001/sections")];

    let sectionElements = section.map(item => {
        let style = {
            color: item.color,
        }
        return (
            <li 
            key={item.id} 
            style = {style} 
            onClick = {()=>props.handleSection(item.id, item.name)}
            >
            {item.name} 
            
            </li>
        )
    })
    return ( 

        <aside className="section-container">
            <h2>    Section List</h2>
            <ul>
                <li
                onClick = {()=>props.handleSection("", "")}
                >All Tasks</li>
                {sectionElements}

            </ul>
        </aside>
     );
}
 
export default SectionNav;