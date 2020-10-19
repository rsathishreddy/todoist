import React from "react";

import { shallow } from "enzyme";
import FormMain from "./FormMain";
import { findByTestAttr, storeFactory } from "../../testUtil";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<FormMain store={store} />)
    .dive()
    .dive();
  console.log(wrapper);
  return wrapper;
};
describe("todo-form component", () => {
  describe("check all component renders", () => {
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
    test("renders formMain component without error", () => {
      const formElement = findByTestAttr(wrapper, "todo-form-component");
      expect(formElement.length).toBe(1);
    });
    test("renders text input ", () => {
      const inputElement = findByTestAttr(wrapper, "input-text-component");
      expect(inputElement.length).toBe(1);
    });
    test("renders select component ", () => {
      const selectElement = findByTestAttr(wrapper, "select-component");
      expect(selectElement.length).toBe(1);
    });
    test("renders date compoent ", () => {
      const datepickerElement = findByTestAttr(wrapper, "datepicker-component");
      expect(datepickerElement.length).toBe(1);
    });
  });
  describe("check if all components are initialized with empty string", () => {
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
    test("input text component", () => {
      const inputElement = findByTestAttr(wrapper, "input-text-component");
      expect(inputElement.text()).toBe("");
    });
    test("select component ", () => {
      const selectElement = findByTestAttr(wrapper, "select-component");
      expect(selectElement.text()).not.toBe("");
      expect(selectElement.text()).toBe("ChooseOpenIn progressdone");
    });
    test("datepicker compoent ", () => {
      const datepickerElement = findByTestAttr(wrapper, "datepicker-component");
      expect(datepickerElement.text()).toBe("<DayPickerInput />");
    });
  });
  describe("check if data is rendered in data-grid", () => {
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
  });
});

test("", () => {});
