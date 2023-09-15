import axios from "axios";
import { setTasks } from "../reducers/taskReducer";
import { API_URL } from "../config"

export const getUserTasks = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/task/getUserTasks?userId=${userId}`
      );
      dispatch(setTasks(response.data.tasks));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const getTask = async (taskId) => {
  try {
    const response = await axios.get(
      `${API_URL}/task/getTask?taskId=${taskId}`
    );

    return response.data;
  } catch (e) {
    alert(e.response.data.message);
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
    const response = await axios.post(
      `${API_URL}/task/createTask`,
      {
        subject: subject,
        description: description,
        priority: priority,
        dueDate: dueDate,
        userId: userId,
      }
    );
    // alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
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
    const response = await axios.post(
      `${API_URL}/task/updateTask`,
      {
        subject: subject,
        description: description,
        priority: priority,
        dueDate: dueDate,
        taskId: taskId,
      }
    );
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const deleteTask = async (taskId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/task/deleteTask`,
      { taskId: taskId, userId: userId }
    );

    if (response.data.message === `Task ${taskId} deleted`) {
      window.location.reload();
    }
  } catch (e) {
    alert(e.response.data.message);
  }
};
