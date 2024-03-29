import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Trash from "../icons/Trash";
import { deleteSection, getSection } from "../redux/section/sectionAction";
import { useEffect } from "react";
import Loading from "./Loading";
import usePrivateAxios from "../Hooks/usePrivateAxios";
const SectionNav = (props) => {

    const sections = useSelector(state => state.section.data);
    const pending = useSelector(state => state.section.loading)
    const param = useParams();
    const dispatch = useDispatch();
    const axiosPrivate = usePrivateAxios();
    
    function handleDelete(e,section){
        e.stopPropagation();
        let confirm = window.confirm('All the tasks related to this section will be delete')
        if(confirm){

            props.handleSection("", "");
            dispatch(deleteSection(section, axiosPrivate));
        }
    }
    let sectionElements = sections.allId.map(item => {
        let style = {
            color: sections.byId[item].color,
        }
        return (
            <li 
                className="section__list__item"
                key={sections.byId[item].section_id} 
                
                onClick = {()=>props.handleSection(sections.byId[item].section_id, sections.byId[item].name)}
            >
            
            <a href="#" 
                className="section_link"
                style = {style} 
            >
                {sections.byId[item].name} 
            </a> 
                <button 
                    className="delete-section"
                    onClick={(e)=> handleDelete(e, sections.byId[item])}
                >
                    <Trash />
                </button>
            </li>
        )
    })

    useEffect(()=>{
        dispatch(getSection(param.userId));
    },[]);
    return ( 
        
        <aside className="section-container">
            <h2>    Section List</h2>
            {pending ? 
            <div className="loading-section">
                <Loading />
            </div>  :
            <div className="menu__list__section">
            
            <ul className="sections_menu">
                <li
                    className="section__list__item"    
                    onClick = {()=>props.handleSection("", "")}
                >
                   <a href="#" className="section_link">All Tasks</a> 
                    
                </li>
                {sectionElements}
                
            </ul>
            </div>
            }
        </aside>
        
        
     );
}
 
export default SectionNav;