import "../index.css";
import Navbar from "./navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import CreateTask from "./createTask/CreateTask";
import MyTasks from "./myTasks/MyTasks";
import EditTask from "./editTask/EditTask";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
          <Routes>
            <Route path="/createTask" Component={CreateTask}></Route>
            <Route path="/myTasks" Component={MyTasks}></Route>
            <Route path="/editTask/:taskId" Component={EditTask}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/registration" Component={Registration}></Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
