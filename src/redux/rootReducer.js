import { combineReducers } from "redux";
import sectionReducer from "./section/sectionReducer";
import toDoReducer from "./toDo/toDoReducer";
import userReducer from "./user/uerReducer";
const rootReducer = combineReducers({
    task: toDoReducer,
    section: sectionReducer,
    user: userReducer,
})

export default rootReducer;