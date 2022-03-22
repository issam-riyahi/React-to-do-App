import { TODO_FETCH_SUCCESS, TODO_FETCH_REQUEST, TODO_FETCH_ERROR } from "./toDoTypes";



const initailState = {
    laoding : false,
    data: [],
    error: "",
}

const toDoReducer = (state = initailState , action) => {
    switch(action.type){
        case  TODO_FETCH_REQUEST :
            return {
                ...state,
                laoding: true,
            }
        case TODO_FETCH_SUCCESS :
            return {
                ...state,
                laoding: false,
                data: [...action.paylaod],
            }
        case TODO_FETCH_ERROR: 
            return {
                ...state,
                laoding: false,
                error: action.paylaod,
            }
        default: return state ;
    }
}

export default toDoReducer;