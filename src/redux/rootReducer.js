import { combineReducers } from "redux";
import sectionReducer from "./section/sectionReducer";
import toDoReducer from "./toDo/toDoReducer";


const rootReducer = combineReducers({
    task: toDoReducer,
    section: sectionReducer,
})

export default rootReducer;