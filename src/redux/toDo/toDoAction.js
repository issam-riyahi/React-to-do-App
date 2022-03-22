import { TODO_FETCH_SUCCESS, TODO_FETCH_REQUEST, TODO_FETCH_ERROR, TODO_UPDATE_REQUEST, TODO_DELETE_REQUEST } from "./toDoTypes";
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

export const UpdatetoDo = (taskUpdated) => {
    return {
        type: TODO_UPDATE_REQUEST,
        paylaod: taskUpdated,
    }
}
export const deletetoDoAction = (taskId) => {
    return {
        type: TODO_DELETE_REQUEST,
        paylaod: taskId,
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

export const updateTask = (task) => dispatch => {
    console.log(task)
    axios.put(`http://localhost:3001/Tasks/${task.id}`, {
        ...task
    })
    .then(res => {
        console.log(res);
        dispatch(UpdatetoDo(task))
    })
    .catch(error => console.log(error));
}
export const deletetoDo = (task) => dispatch => {
    console.log(task)
    axios.delete(`http://localhost:3001/Tasks/${task.id}`)
    .then(res => {
        console.log(res);
        dispatch(deletetoDoAction(task))
    })
    .catch(error => console.log(error));
}
