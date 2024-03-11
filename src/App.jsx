import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Tables from "./pages/Tables";
import Error from "./pages/Error";

export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/helpdesk/Home" element={<Home />} />
          <Route path="/helpdesk/" element={<Home />} />

          <Route path="/helpdesk/NewTask" element={<NewTask />} />
          <Route path="/helpdesk/Login" element={<Login />} />
          
          <Route path="/helpdesk/Tables" element={<Tables />} />
          <Route path="/helpdesk/Tables/:params" element={<Task />} />
          <Route path="/helpdesk/" element={<Error />} />
        </Routes>
    </BrowserRouter>
  )
}