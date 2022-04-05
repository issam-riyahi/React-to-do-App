import Home from "./Home";
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom";
import AllTasks from "./components/AllTasks";
import NotFouns from "./NotFound";
import { Provider } from "react-redux";
import  store  from "./redux/store";
import Regiter from "./register/Regiter";
import Login from "./login/Login";
import {AuthProvider} from "./Context/AuthProvider";
import RequireAuth from "./Context/RequireAuth";
import CheckAuth from "./Context/CheckAuth";
const App = () => {



  return (
    <div className="toDoApp">
      <AuthProvider>
            
              <Provider store={store}>
                <Routes>
                    <Route path="/register" element={<Regiter />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>
                    <Route path="/" element={
                      <CheckAuth> 
                        <RequireAuth>
                            <Header />
                        </RequireAuth>
                      </CheckAuth> 
                    } > 
                          {/* <Route index element={
                            <RequireAuth>
                              <Home /> 
                            </RequireAuth>
                          } /> */}
                          <Route index path="home/:userId" element={
                              <RequireAuth>
                                <Home />
                              </RequireAuth>
                          } />
                          <Route path="allTasks/:userId" element={
                            <RequireAuth>
                                <AllTasks />
                            </RequireAuth>
                          } />
                          <Route path="*" element={<NotFouns />} ></Route>
                    </Route>
                </Routes>
              </Provider>
            
        </AuthProvider>
          
    </div>
  )
}
 
export default App;