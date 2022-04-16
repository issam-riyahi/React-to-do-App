import axios from "../../api/axios"
import { fetchToDo } from "../toDo/toDoAction"
import { 
    FETCH_SECTION_SUCCESS,
    FETCH_SECTION_FAILD,
    FETCH_SECTION_REQUEST,
    CREATE_SECTION
 } from "./sectiontypes"


export const fetchRequest = ()=>{
    return {
        type: FETCH_SECTION_REQUEST,
    }
}
export const fetchRequestSuccess = (sections)=>{
    return {
        type: FETCH_SECTION_SUCCESS,
        payload: sections,
    }
}
export const fetchRequestFailed = (error)=>{
    return {
        type: FETCH_SECTION_FAILD,
        payload: error,
    }
}
export const createSectionAction = (section)=>{
    return {
        type: CREATE_SECTION,
        payload: section,
    }
}


export const getSection = (userSection) => (dispatch) => {
        dispatch(fetchRequest());
        axios.get(`section/${userSection}`)
        .then(res => dispatch(fetchRequestSuccess(res.data?.data?.rows)))
        .catch(error => dispatch(fetchRequestFailed(error)))
}

export const createSection = (section) => (dispatch) => {
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    
    axios.post('/section',Object.keys(section).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(section[k])}`).join('&'),{
        // withCredentials: true,
        // mode: 'cros',
        headers:{
            // 'Content-Type' : 'application/json',
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
    .then(res => {
        if(res.status === 200){
            dispatch(createSectionAction(section));
            dispatch(getSection(section.userId));
        }
    })
    
}

export const deleteSection = (section) => dispatch => {
    axios.delete(`/section?sectionId=${section.section_id}`)
    .then(res => {
        
        dispatch(getSection(section.user_id));
        dispatch(fetchToDo(section.user_id))
    })
}