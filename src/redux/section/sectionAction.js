import axios from "../../api/axios"
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
        axios.get(`sections${'?userId='+userSection}`)
        .then(res => dispatch(fetchRequestSuccess(res.data)))
        .catch(error => dispatch(fetchRequestFailed(error)))
}

export const createSection = (section) => (dispatch) => {
    axios.post('/sections',{
        ...section
    })
    .then(res => {
        if(res.status === 201){
            dispatch(createSectionAction(section));
            dispatch(getSection(section.userId));
        }
    })
    
}

export const deleteSection = (section) => dispatch => {
    axios.delete(`/sections`,{
        data : section
    })
    .then(res => {
        dispatch(getSection(userId));
    })
}