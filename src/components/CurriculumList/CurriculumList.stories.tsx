import * as React from "react";
import { storiesOf } from "@storybook/react";
import CurriculumList, { ICurriculum } from "./CurriculumList";
import { tableColumns } from "../GrepTable/GrepTable.stories";

export const curriculums: ICurriculum[] = [
    {
        id: 1,
        code: "1001",
        title: "Læreplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 2,
        code: "1002",
        title: "Enda en læreplan",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 3,
        code: "1003",
        title: "Læreplan for videregående",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 4,
        code: "100000000001",
        title: "Testplanen med sinnsykt lang tittel bla bla bla bla bla bla",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    }
];

storiesOf("CurriculumList", module).add("standard", () => (
    <CurriculumList
        title={"Mine læreplaner"}
        columns={tableColumns}
        curriculums={curriculums}
        onCurriculumClick={id => console.log("clicked on ", id)}
    />
));
