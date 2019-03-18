import * as React from "react";
import { shallow } from "enzyme";

import AppBarTop from "./AppBarTop";

describe("AppBarProfile", () => {
  it("should render correctly", () => {
    const component = shallow(<AppBarTop />);

    expect(component).toMatchSnapshot();
  });
});
