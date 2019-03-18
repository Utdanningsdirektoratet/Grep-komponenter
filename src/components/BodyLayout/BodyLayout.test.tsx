import * as React from "react";
import { shallow } from "enzyme";

import BodyLayout from "./BodyLayout";

describe("BodyLayout", () => {
  it("should render correctly", () => {
    const component = shallow(<BodyLayout />);

    expect(component).toMatchSnapshot();
  });
});
