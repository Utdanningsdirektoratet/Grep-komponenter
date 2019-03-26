import * as React from "react";
import { shallow } from "enzyme";

import CurriculumTable from "./CurriculumTable";

describe("CurriculumTable", () => {
    it("should render correctly", () => {
        const component = shallow(
            <CurriculumTable
                title=""
                curriculums={[]}
                onCurriculumClick={() => void 0}
                statuses={[]}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("it renders without props", () => {
        const component = shallow(<CurriculumTable />);
        component.render();
    });
});
