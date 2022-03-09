import Home from "./Home";
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom";
import TableTasks from "./components/TableTasks";

const App = () => {

  return (
    <div className="toDoApp">
        <Header />

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="allTasks" element={<TableTasks />} />

      </Routes>
        
          
    </div>
  )
}
 
export default App;