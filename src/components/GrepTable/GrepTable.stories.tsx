import * as React from "react";
import { storiesOf } from "@storybook/react";
import GrepTable, { ITableColumn } from "./GrepTable";
import { IMenuItem } from "../DropdownMenu";

interface ICurriculum {
    id: number;
    code: string;
    title: string;
    statusText: string;
    lastModified: string;
}

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
        getTooltip: row => row.statusText,
        getCell: row => row.statusText
    },
    {
        label: "Publisert",
        width: 10,
        forceTooltip: true,
        getCell: row => row.lastModified
    }
];

const CURRICULUM_COLUMNS: Array<ITableColumn<any>> = [
    {
        label: "Kode",
        width: 8,
        getCell: row => "Kode"
    },
    {
        label: "Tittel",
        getCell: row => "Tittel"
    },
    {
        label: "Status",
        getCell: row => "Status"
    },
    {
        label: "Sist endret",
        width: 9,
        getCell: row => "10. desember"
    },
    {
        label: "Ansvarlig",
        width: 9,
        getCell: row => row.grepAdminResponsibleUsername
    },
    {
        label: "Importert",
        width: 8,
        getCell: row => <div style={{ textAlign: "center" }}>{"\u2714"}</div>
    },
    {
        label: "Klar",
        width: 7,
        getCell: row => <div style={{ textAlign: "center" }}>{"\u2714"}</div>
    },
    {
        label: "Tanket",
        width: 8,
        getCell: row => null
    },
    {
        label: "Låst",
        width: 7,
        getCell: row => null
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
        statusText:
            "Kjempelang status bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
        lastModified: "10. desember"
    }
];

const menuItems: IMenuItem[] = [
    {
        label: "Test",
        handleClick: id => console.log("clicked on rowId! ", id)
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
        <GrepTable
            columns={tableColumns}
            data={tableData.map(c => {
                if (c.id % 2 === 0) {
                    return {
                        ...c,
                        rowDisabled: true
                    };
                }
                return c;
            })}
            clickableRows
        />
    ))
    .add("without data", () => <GrepTable columns={tableColumns} data={[]} />)
    .add("with dropdown-menu", () => (
        <GrepTable
            columns={CURRICULUM_COLUMNS}
            data={tableData}
            dropdownItems={menuItems}
        />
    ))
    .add("with pagination", () => (
        <GrepTable
            columns={tableColumns}
            data={tableData}
            pagination
            rowsPerPage={5}
        />
    ));
