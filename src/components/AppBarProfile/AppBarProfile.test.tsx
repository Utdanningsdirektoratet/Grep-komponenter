import * as React from "react";
import { shallow } from "enzyme";

import AppBarProfile from "./AppBarProfile";

describe("AppBarProfile", () => {
    it("should render correctly", () => {
        const component = shallow(
            <AppBarProfile
                fullName=""
                userRole=""
                onButtonClick={() => void 1}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
