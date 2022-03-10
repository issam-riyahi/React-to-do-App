import Home from "./Home";
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom";
import AllTasks from "./components/AllTasks";

const App = () => {

  return (
    <div className="toDoApp">
        <Header />

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="allTasks" element={<AllTasks />} />

      </Routes>
        
          
    </div>
  )
}
 
export default App;