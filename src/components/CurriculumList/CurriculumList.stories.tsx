import * as React from "react";
import { storiesOf } from "@storybook/react";
import CurriculumList, {
    ICurriculum,
    ICurriculumStatus
} from "./CurriculumList";

export const curriculums: ICurriculum[] = [
    {
        id: 1,
        statusId: 8,
        code: "1001",
        locked: false,
        title: "Læreplaner"
    },
    {
        id: 2,
        statusId: 9,
        code: "1002",
        locked: true,
        title: "Metadata"
    },
    {
        id: 3,
        statusId: 9,
        code: "1003",
        locked: false,
        title: "Systemadministrasjon"
    }
];

export const statuses: ICurriculumStatus[] = [
    {
        id: 8,
        text: "Test-status 1"
    },
    {
        id: 9,
        text: "Test-status 2"
    }
];

storiesOf("CurriculumList", module).add("standard", () => (
    <CurriculumList
        title={"Mine tilganger"}
        statuses={statuses}
        curriculums={curriculums}
        onCurriculumClick={id => console.log("clicked on ", id)}
    />
));
