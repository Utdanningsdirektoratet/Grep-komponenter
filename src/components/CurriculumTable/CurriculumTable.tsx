import * as React from "react";
import { Container, Title } from "./curriculumTableStyles";
import GrepTable, { ITableColumn } from "../GrepTable/GrepTable";

export interface ICurriculum {
    id: number;
    code: string;
    title: string;
    statusText: string;
    lastModified: string;
}

interface CurriculumListProps {
    title: string;
    curriculums: ICurriculum[];
    columns: Array<ITableColumn<ICurriculum>>;
    onCurriculumClick: (args: number) => void;
}

const CurriculumList: React.FC<CurriculumListProps> = props => (
    <Container>
        <Title>{props.title}</Title>
        <GrepTable
            data={props.curriculums}
            columns={props.columns}
            clickableRows
            placeholderText={"Finner ingen læreplaner."}
            onRowClick={id => props.onCurriculumClick(id)}
        />
    </Container>
);

export default CurriculumList as React.ComponentType<CurriculumListProps>;
