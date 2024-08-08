import { useEffect, useState } from "react";
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
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      try {
        setIsLoading(true);
        await dispatch(auth());
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    checkIsAuthenticated();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen h-screen flex flex-col">
      {isLoading ? (
        <div className="flex-grow flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" Component={Login}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/register" Component={Register}></Route>
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
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
