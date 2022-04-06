import { TODO_FETCH_SUCCESS, 
         TODO_FETCH_REQUEST, 
         TODO_FETCH_ERROR, 
         TODO_UPDATE_REQUEST,
         TODO_DELETE_REQUEST,
         TODO_CREAT_REQUEST
         } from "./toDoTypes";



const initailState = {
    loading : false,
    data: [],
    error: "",
}

const toDoReducer = (state = initailState , action) => {
    switch(action.type){
        case  TODO_FETCH_REQUEST :
            return {
                ...state,
                loading: true,
            }
        case TODO_FETCH_SUCCESS :
            return {
                ...state,
                loading: false,
                data: [...action.paylaod],
            }
        case TODO_FETCH_ERROR: 
            return {
                ...state,
                loading: false,
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
        case TODO_CREAT_REQUEST :
            // state.data.push({...action.paylaod})
            return {
                ...state,
            }
        default: return state ;
    }
}

export default toDoReducer;