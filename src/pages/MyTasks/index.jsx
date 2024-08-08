import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TasksList from "../../components/TasksList";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getUserTasks } from "../../actions/task.actions";

import axios from "axios";

const MyTasks = () => {
  const [isLoading, setIsLoading] = useState(true);

  const tasks = useSelector((state) => state.tasks.tasks);
  const userId = useSelector((state) => state.user.currentUser.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(getUserTasks(userId)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userId, dispatch]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TasksList tasks={tasks} userId={userId} />
      )}
    </div>
  );
};

export default MyTasks;
