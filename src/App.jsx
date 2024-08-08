import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./actions/user.actions";

import NavBar from "./components/NavBar";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>

          {/* Защищенные маршруты */}
          <Route
            path="/createTask"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myTasks"
            element={
              <ProtectedRoute>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editTask/:taskId"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
