import { createStore, applyMiddleware } from "redux";
import toDoReducer from "./toDo/toDoReducer";
import thunk from "redux-thunk";


const store = createStore(toDoReducer, applyMiddleware(thunk));

export default store;