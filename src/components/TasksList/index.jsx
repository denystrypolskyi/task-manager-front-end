import React from "react";
import { NavLink } from "react-router-dom";

import Task from "../Task";

const TasksList = ({ tasks, userId }) => (
  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5 mt-2.5 sm:px-5 md:px-10 lg:px-10">
    {tasks.map((task) => (
      <Task
        key={task._id}
        id={task._id}
        subject={task.subject}
        description={task.description}
        priority={task.priority}
        dueDate={task.dueDate}
        createdAt={task.createdAt}
        userId={userId}
      />
    ))}
    <NavLink to="/createTask">
      <button className="text-green-700 rounded-lg hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-thin text-xl px-5 py-2.5 text-center w-full h-72 hover:scale-105 transition">
        Add
      </button>
    </NavLink>
  </div>
);

export default TasksList;
