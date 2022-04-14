import { fetchRequestFailed } from './sectionAction'
import { 
        FETCH_SECTION_REQUEST, 
        FETCH_SECTION_SUCCESS,
        FETCH_SECTION_FAILD,
        CREATE_SECTION
} from './sectiontypes'


const initailState = {
    loading: false,
    data: {
        byId: {

        },
        allId: [],
    },
    error: '',
}



const sectionReducer = (state = initailState , action) => {
    switch(action.type){
        case FETCH_SECTION_REQUEST :
            return {
                ...state,
                loading: true,
            }
        case FETCH_SECTION_SUCCESS : 
        const data = action.payload.reduce((prevItem, currItem) => {
                prevItem.byId[currItem.section_id] = {...currItem};
                prevItem.allId.push(currItem.section_id); 

                return prevItem;
            },{
                
                    byId: {

                    },
                    allId: [],
                
            })
            console.log(action.payload)
            return {
                ...state,
                data: data,
                loading: false,
            }
        
        case FETCH_SECTION_FAILD : 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_SECTION :
            // const sectionId = action.payload.id;
            // state.data.byId[sectionId] = action.payload;
            // state.data.allId.push(sectionId);
            return state;
        default : return state;
    }
}
export default sectionReducer ;