import axios from "../../api/axios"






export const getUser = (user) => {
    return {
        type: 'userRequest',
        payload: user,
    }
}

export const getUserError = (error) => {
    return {
        type: 'userRequestError',
        payload: error,
    }
}

// Get User

export const fetchUser = (username, password) => (dispatch) => {
    axios.get(`/users?username=${username}`)
    .then(res => {
        
        if(res.status = 200){
            if(res.data[0].password === password){

                dispatch(getUser(res.data))
            }
            else {
                dispatch(getUserError('the Password incorrect'));
            }
        }
    })
    .catch(error => dispatch(getUserError(error)));
}