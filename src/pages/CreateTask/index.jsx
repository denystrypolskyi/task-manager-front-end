import React, { useState } from "react";
import { useSelector } from "react-redux";

import { createTask } from "../../actions/task.actions";
import LoadingSpinner from "../../components/LoadingSpinner";

const inputStyles =
  "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const labelStyles =
  "peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

const taskInitialState = {
  subject: "",
  description: "",
  priority: "Default",
  dueDate: "",
};

const textColorsInitialState = {
  dueDate: "text-gray-500",
  priority: "text-gray-500",
};

const CreateTask = () => {
  const userId = useSelector((state) => state.user.currentUser.id);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [task, setTask] = useState(taskInitialState);
  const [textColors, setTextColors] = useState(textColorsInitialState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((previousState) => ({
      ...previousState,
      [name]: value,
    }));

    setTextColors((prev) => ({ ...prev, [name]: "text-black" }));
  };

  const handleCreateTask = async () => {
    if (
      task.subject.trim() === "" ||
      task.description.trim() === "" ||
      task.priority === "Default" ||
      !task.dueDate
    ) {
      setErrorMessage(
        "Please fill in all required fields: subject, description, priority (select an option other than 'Default'), and due date."
      );
      return;
    }

    if (!errorMessage) {
      try {
        setIsLoading(true);

        await createTask(
          task.subject,
          task.description,
          task.priority,
          task.dueDate,
          userId
        );

        setSuccessMessage("Task created");
        setErrorMessage(null);
        setTask(taskInitialState);
      } catch (error) {
        setSuccessMessage(null);
        setErrorMessage(error.message);
      } finally {
        setTextColors(textColorsInitialState);
        setTask(taskInitialState);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="sm:w-11/12 md:w-2/3 lg:w-1/2 mx-auto border p-5 rounded-lg shadow-md bg-white mt-2.5">
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="subject"
          id="floating_title"
          className={inputStyles}
          placeholder=" "
          required
          onChange={handleChange}
          value={task.subject}
          autoComplete="off"
        />
        <label htmlFor="floating_title" className={labelStyles}>
          Subject
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="description"
          id="floating_description"
          className={inputStyles}
          placeholder=" "
          required
          onChange={handleChange}
          value={task.description}
          autoComplete="off"
        />
        <label htmlFor="floating_description" className={labelStyles}>
          Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          className={`block py-2.5 px-0 w-full text-sm ${textColors.dueDate} bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          placeholder="Due date"
          required
          onChange={handleChange}
          value={task.dueDate}
        />
        <label htmlFor="dueDate" className={labelStyles}>
          Due date
        </label>
      </div>
      <label htmlFor="underline_select" className="sr-only">
        Underline select
      </label>
      <select
        name="priority"
        id="underline_select"
        className={`block py-2.5 mb-6 px-0 w-full text-sm ${textColors.priority} bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer`}
        onChange={handleChange}
        value={task.priority}
      >
        <option value="Default" disabled>
          Choose Priority
        </option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <button
        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
        onClick={() => handleCreateTask()}
      >
        Create
      </button>
      {(errorMessage || successMessage) && (
        <div
          className={`${
            errorMessage
              ? "text-red-500 border-red-500"
              : "text-green-700 border-green-700"
          } text-sm absolute bottom-5 right-5 border rounded-lg select-none p-2.5`}
        >
          <p className="border-b">
            {errorMessage ? errorMessage : successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
