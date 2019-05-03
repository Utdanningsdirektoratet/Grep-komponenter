import * as React from "react";
import { Container, Title } from "./curriculumTableStyles";
import GrepTable, { IGrepTableProps } from "../GrepTable/GrepTable";

interface CurriculumListProps extends IGrepTableProps {
    title: string;
}

const CurriculumList: React.FC<CurriculumListProps> = props => (
    <Container>
        <Title>{props.title}</Title>
        <GrepTable
            data={props.data}
            columns={props.columns}
            clickableRows
            placeholderText={"Finner ingen læreplaner."}
            onRowClick={id => props.onRowClick && props.onRowClick(id)}
        />
    </Container>
);

export default CurriculumList as React.ComponentType<CurriculumListProps>;
