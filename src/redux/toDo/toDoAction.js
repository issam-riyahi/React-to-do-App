import { TODO_FETCH_SUCCESS, TODO_FETCH_REQUEST, TODO_FETCH_ERROR } from "./toDoTypes";
import axios from "axios";


export const toDoRequest = () => {
    return {
        type: TODO_FETCH_REQUEST,
    }
}
export const toDoSuccess = (toDo) => {
    return {
        type: TODO_FETCH_SUCCESS,
        paylaod: toDo,
    }
}
export const toDoError = (error) => {
    return {
        type: TODO_FETCH_ERROR,
        paylaod: error
    }
}


export const fetchToDo = () => dispatch => {
    dispatch(toDoRequest());
    axios.get('http://localhost:3001/Tasks')
    .then(res => {
        setTimeout(()=> {
            dispatch(toDoSuccess(res.data))   
            
        },3000)
    })
    .catch(error => dispatch(toDoError(error)));
}