

const initailState = {
    user: {},
    error: '',
}



const userReducer = (state = initailState, action) => {
    switch(action.type) {
        case 'userRequest' :
            return {
                user: action.payload[0],
                error: ''
            } 
        
        case 'userRequestError' : 
            return {
                user : {},
                error: action.payload
            }
        default : return state;
    }
}

export default userReducer