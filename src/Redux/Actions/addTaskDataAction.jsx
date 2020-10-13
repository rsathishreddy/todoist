import {
  ADD_TASK_DATA,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
} from "../Constants/constants";

export const addTaskData = (data) => {
  return {
    type: ADD_TASK_DATA,
    data,
  };
};

export const deleteTask = (task) => {
  return {
    type: DELETE_TASK,
    task,
  };
};

export const currentTask = (task) => {
  return {
    type: CURRENT_TASK,
    task,
  };
};

export const updateTaskData = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  };
};
