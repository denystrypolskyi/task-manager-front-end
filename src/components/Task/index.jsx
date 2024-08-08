import React from "react";
import { deleteTaskAction } from "../../actions/task.actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Task = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editTask/${props.id}`);
  };

  const handleDelete = () => {
    dispatch(deleteTaskAction(props.id, props.userId));
  };
  const getPriorityStyle = () => {
    switch (props.priority) {
      case "Low":
        return "bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 shadow-md";
      case "Normal":
        return "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md";
      case "High":
        return "bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-md";
      default:
        return "";
    }
  };

  const formatDueDate = () => {
    const dateSliced = props.dueDate.split("-");

    return `${dateSliced[2]}/${dateSliced[1]}/${dateSliced[0]}`;
  };

  const formatCreatedAt = () => {
    const dateSliced = props.createdAt.split("/");

    if (dateSliced[0] < 10) {
      dateSliced[0] = "0" + dateSliced[0];
    }
    return `${dateSliced[1]}/${dateSliced[0]}/${dateSliced[2]}`;
  };

  const priorityStyle = getPriorityStyle();

  const dueDate = formatDueDate();

  const createdAt = formatCreatedAt();

  return (
    <div className="w-full bg-white h-72 hover:scale-105 transition rounded-lg">
      <div className="border shadow-md w-full mx-auto p-5 flex flex-col rounded-lg h-full">
        <div className="flex items-center w-full">
          <div className="flex w-full justify-between mt-1">
            <div className="text-lg h-7 overflow-hidden whitespace-nowrap text-ellipsis w-60">
              {props.subject}
            </div>
            <span
              className={` ${priorityStyle} h-7 w-16 text-center text-xs font-medium py-1.5 select-none rounded-md text-white`}
            >
              {props.priority}
            </span>
          </div>
        </div>
        <div className="h-40 w-full overflow-hidden text-ellipsis">
          <p className="text-sm overflow-hidden text-ellipsis">
            {props.description}
          </p>
        </div>
        <div className="mt-5 flex items-center w-full">
          <div className="flex justify-between w-full gap-3.5">
            <button
              onClick={handleEdit}
              className="text-yellow-500 hover:text-white border border-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 h-8 w-16 text-center text-xs font-medium py-2 select-none rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 h-8 w-16 text-center text-xs font-medium py-2 select-none rounded-md mr-auto transition"
            >
              Delete
            </button>
          </div>
          <div className="text-xs text-slate-500 ml-auto">
            Due date: {dueDate}
          </div>
          <div className="text-xs text-slate-500 ml-auto">
            Created at: {createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
