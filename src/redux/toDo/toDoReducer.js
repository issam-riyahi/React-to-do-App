import { TODO_FETCH_SUCCESS, 
         TODO_FETCH_REQUEST, 
         TODO_FETCH_ERROR, 
         TODO_UPDATE_REQUEST,
         TODO_DELETE_REQUEST
         } from "./toDoTypes";



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
        case TODO_UPDATE_REQUEST : 
    
            return {
                ...state,
                data: state.data.map(item => {
                    if(item.id === action.paylaod.id){
                       return item = {...action.paylaod}
                        
                    }
                    return item;
                })

            }
        case TODO_DELETE_REQUEST :
            return {
                ...state,
                data: state.data.filter(item => {
                   return  item.id !== action.paylaod.id;
                })
            }
        default: return state ;
    }
}

export default toDoReducer;