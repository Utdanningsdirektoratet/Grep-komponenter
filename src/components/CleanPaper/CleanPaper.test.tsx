import * as React from "react";
import { shallow } from "enzyme";

import CleanPaper from "./CleanPaper";

describe("CleanPaper", () => {
  it("should render correctly", () => {
    const component = shallow(<CleanPaper classes={{ root: "" }} />);

    expect(component).toMatchSnapshot();
  });
});
