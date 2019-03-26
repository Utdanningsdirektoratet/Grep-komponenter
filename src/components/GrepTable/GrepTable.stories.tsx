import * as React from "react";
import { storiesOf } from "@storybook/react";
import GrepTable, { ITableColumn } from "./GrepTable";
import { ICurriculum } from "../CurriculumList";

export const tableColumns: Array<ITableColumn<ICurriculum>> = [
    {
        label: "Kode",
        width: 10,
        getCell: row => row.code
    },
    {
        label: "Navn",
        getCell: (row: ICurriculum) => row.title
    },
    {
        label: "Status",
        getCell: (row: ICurriculum) => row.statusText
    },
    {
        label: "Publisert",
        getCell: (row: ICurriculum) => row.lastModified
    }
];

export const tableData: ICurriculum[] = [
    {
        id: 1,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 2,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 3,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 4,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 5,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    },
    {
        id: 6,
        code: "1001",
        title: "Testplanen",
        statusText: "Under arbeid",
        lastModified: "10. desember"
    }
];

storiesOf("Grep table", module)
    .add("standard", () => (
        <GrepTable columns={tableColumns} data={tableData} />
    ))
    .add("clickable", () => (
        <GrepTable columns={tableColumns} data={tableData} clickableRows />
    ))
    .add("without data", () => <GrepTable columns={tableColumns} data={[]} />)
    .add("with pagination", () => (
        <GrepTable
            columns={tableColumns}
            data={tableData}
            pagination
            rowsPerPage={5}
        />
    ));
