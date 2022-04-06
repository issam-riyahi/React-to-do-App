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

// export const fetchUser = (username, password) => (dispatch) => {

//     axios.get(`/users?username=${username}&password=${password}`)
//     .then(res => {
        
//         if(res.status = 200){
            

//                 dispatch(getUser(res.data))
            
//         }
//         else {
//             dispatch(getUserError('The Password or username incorrect'));
//         }
//     })
//     .catch(error => dispatch(getUserError(error)));
// }