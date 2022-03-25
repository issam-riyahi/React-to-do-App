import Home from "./Home";
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom";
import AllTasks from "./components/AllTasks";
import NotFouns from "./NotFound";
import { Provider } from "react-redux";
import  store  from "./redux/store";
import Regiter from "./register/Regiter";
import Login from "./login/Login";
const App = () => {

  return (
    <div className="toDoApp">
        <Header />
        <Provider store={store}>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Regiter />} ></Route>
            <Route path="login" element={<Login />} ></Route>
            <Route path="allTasks" element={<AllTasks />} />
            <Route path="*" element={<NotFouns />} ></Route>
        </Routes>
        </Provider>
        
          
    </div>
  )
}
 
export default App;