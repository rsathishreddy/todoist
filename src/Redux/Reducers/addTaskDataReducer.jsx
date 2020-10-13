import {
  ADD_TASK_DATA,
  CURRENT_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../Constants/constants";
const initialState = {
  addTaskData: {
    data: [],
    currentTask: {},
  },
};

export const addTaskDataReducer = (
  state = initialState.addTaskData,
  action
) => {
  switch (action.type) {
    case ADD_TASK_DATA:
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case DELETE_TASK:
      const tempData = [...state.data];
      const items = tempData.filter(
        (item) => item.randomId !== action.task.randomId
      );
      return {
        ...state,
        data: items,
      };
    case CURRENT_TASK:
      return {
        ...state,
        currentTask: action.task,
      };
    case UPDATE_TASK:
      var index = state.data.findIndex((x) => {
        return x.randomId === action.task.randomId;
      });
      if (index === -1) {
      } else {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            Object.assign({}, state.data[index], action.task),
            ...state.data.slice(index + 1),
          ],
        };
      }
      break;
    default:
      return state;
  }
};
