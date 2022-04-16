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
    // Object.keys(task).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(task[k])}`).join('&')
    axios.put(`/tasks/${task.id}`, task ,{
        headers:{
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // mode: 'cros',
    })
    .then(res => {
        console.log(res);
        dispatch(fetchToDo(task.userId, false));
    })
    .catch(error => console.log(error));
}

export const deletetoDo = (task) => dispatch => {
    axios.delete(`/tasks?tasks_id=${task.id}`)
    .then(res => {
        if(res?.status === 200){

            dispatch(fetchToDo(task.userId, false));
        }
    })
    .catch(error => console.log(error));
}

export const creatToDo = (task) => dispatch => {
    let data = {...task, done: 0};
    axios.post(`/tasks`, Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&'),{
        // headers:{'Content-Type': 'application/json'}
    })
    .then(res => {
        const {userId} = task
        dispatch(addToDo(task));
        dispatch(fetchToDo(userId, false));
    })
    .catch(error => console.log(error));
}
