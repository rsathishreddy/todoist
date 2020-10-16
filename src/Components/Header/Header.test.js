import React from "react";

import { shallow } from "enzyme";
import Header from "./Header";
import { findByTestAttr } from "../../testUtil";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const setup = () => shallow(<Header />);

describe("header component", () => {
  test("check if the component has header or not", () => {
    const wrapper = setup();
    const headerElement = findByTestAttr(wrapper, "App-header");
    expect(headerElement.length).toBe(1);
  });
  test("check if the component has text or not", () => {
    const wrapper = setup();
    const headerElement = findByTestAttr(wrapper, "App-header");
    expect(headerElement.text()).not.toBe(0);
  });
});
