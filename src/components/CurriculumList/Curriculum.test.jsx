import * as React from "react";
import { shallow } from "enzyme";

import CurriculumList from "./CurriculumList";

describe("CurriculumList", () => {
    it("should render correctly", () => {
        const component = shallow(
            <CurriculumList
                title=""
                curriculums={[]}
                onCurriculumClick={() => void 0}
                statuses={[]}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
