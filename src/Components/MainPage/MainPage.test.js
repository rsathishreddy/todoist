import React from "react";

import { shallow } from "enzyme";
import MainPage from "./MainPage";
import FormMain from "./FormMain";
import Header from "../Header/Header";
import { findByTestAttr, storeFactory } from "../../testUtil";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<MainPage store={store} />)
    .dive()
    .dive();
  //   console.log(wrapper);
  return wrapper;
};

describe("Main page components", () => {
  describe("check if all components renders", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        addTaskDataReducer: {
          addTaskData: {
            data: [],
            currentTask: {},
          },
        },
      };
      wrapper = setup(initialState);
    });
    test("renders task button ", () => {
      const buttonComponent = findByTestAttr(
        wrapper,
        "add-task-button-component"
      );
      expect(buttonComponent.length).toBe(1);
    });
    test("renders ag-grid", () => {
      const agGrid = findByTestAttr(wrapper, "ag-data-grid-component");
      expect(agGrid.length).toBe(1);
    });
  });

  describe("check if formMain renders when add task button clicked", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        addTaskDataReducer: {
          addTaskData: {
            data: [],
            currentTask: {},
          },
        },
      };
      wrapper = setup(initialState);
    });
    test("renders task button ", () => {
      const buttonComponent = findByTestAttr(
        wrapper,
        "add-task-button-component"
      );
      buttonComponent.simulate("click");
      expect(wrapper.containsMatchingElement(<FormMain />)).toEqual(true);
    });
  });
});
