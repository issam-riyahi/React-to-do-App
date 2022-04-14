import {    
        TODO_FETCH_SUCCESS, 
        TODO_FETCH_REQUEST, 
        TODO_FETCH_ERROR, 
        TODO_UPDATE_REQUEST, 
        TODO_DELETE_REQUEST,
        TODO_CREAT_REQUEST
 } from "./toDoTypes";
import axios from "../../api/axios";


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

export const addToDo = (toDo) => {
    return {
        type: TODO_CREAT_REQUEST,
        
        paylaod: toDo,
    }
}

export const fetchToDo = (userId, firstLoading = true) => dispatch => {
    if(firstLoading){
        dispatch(toDoRequest());  
    }
    axios.get(`/tasks${userId ? '?user_id='+userId : ''}`)
    .then(res => {
            // console.log(res.data);
            dispatch(toDoSuccess(res.data?.data?.rows))   
            
       
    })
    .catch(error => dispatch(toDoError(error)));
}

export const updateTask = (task) => dispatch => {
    console.log(task)
    axios.put(`/Tasks/${task.id}`, {
        ...task
    })
    .then(res => {
        console.log(res);
        dispatch(UpdatetoDo(task))
    })
    .catch(error => console.log(error));
}

export const deletetoDo = (task) => dispatch => {
    axios.delete(`/Tasks/${task.id}`)
    .then(res => {
        console.log(res);
        dispatch(deletetoDoAction(task))
    })
    .catch(error => console.log(error));
}

export const creatToDo = (task) => dispatch => {
    axios.post(`/Tasks/`,{
        ...task
    })
    .then(res => {
        const {userId} = task
        dispatch(addToDo(task));
        dispatch(fetchToDo(userId, false));
    })
    .catch(error => console.log(error));
}
