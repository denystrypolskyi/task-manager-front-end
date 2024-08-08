import { deleteTask, setTasks } from "../reducers/taskReducer";
import { API_URL } from "../config";
import axiosWithAuth from "../interceptors/axiosWithAuth";

export const getUserTasks = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axiosWithAuth.get(`${API_URL}/task/all`);
      dispatch(setTasks(response.data.tasks));
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };
};

export const getTaskById = async (taskId) => {
  try {
    const response = await axiosWithAuth.get(`${API_URL}/task/${taskId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createTask = async (
  subject,
  description,
  priority,
  dueDate,
  userId
) => {
  try {
    const response = await axiosWithAuth.post(`${API_URL}/task`, {
      subject: subject,
      description: description,
      priority: priority,
      dueDate: dueDate,
      userId: userId,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateTask = async (
  subject,
  description,
  priority,
  dueDate,
  taskId
) => {
  try {
    const response = await axiosWithAuth.put(`${API_URL}/task`, {
      subject: subject,
      description: description,
      priority: priority,
      dueDate: dueDate,
      taskId: taskId,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteTaskAction = (taskId, userId) => {
  return async (dispatch) => {
    try {
      await axiosWithAuth.delete(`${API_URL}/task/${taskId}`);

      dispatch(deleteTask(taskId));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
};
