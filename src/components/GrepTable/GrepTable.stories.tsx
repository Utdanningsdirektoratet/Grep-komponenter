import * as React from "react";
import { storiesOf } from "@storybook/react";
import GrepTable, { ITableColumn } from "./GrepTable";
import { ICurriculum } from "../CurriculumTable";

export const tableColumns: Array<ITableColumn<ICurriculum>> = [
    {
        label: "Kode",
        width: 7,
        getCell: row => row.code
    },
    {
        label: "Navn",
        width: 13,
        getCell: row => row.title
    },
    {
        label: "Status",
        width: 8,
        getCell: row => row.statusText
    },
    {
        label: "Publisert",
        width: 10,
        getCell: row => row.lastModified
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
    .addDecorator(storyFn => <div style={{ margin: 10 }}>{storyFn()}</div>)
    .add("standard", () => (
        <GrepTable columns={tableColumns} data={tableData} />
    ))
    .add("outlined", () => (
        <GrepTable columns={tableColumns} data={tableData} outlined />
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
