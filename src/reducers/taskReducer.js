const SET_TASKS = "SET_TASKS";
const DELETE_TASK = "DELETE_TASK";

const defaultState = { tasks: [] };

export default function taskReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
}

export const setTasks = (tasks) => ({ type: SET_TASKS, payload: tasks });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, payload: taskId });
