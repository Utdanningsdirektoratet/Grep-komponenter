import * as React from "react";
import { Container, Title } from "./curriculumTableStyles";
import GrepTable, { IGrepTableProps } from "../GrepTable/GrepTable";

interface CurriculumListProps extends IGrepTableProps {
    title: string;
    style?: React.CSSProperties;
}

const CurriculumList: React.FC<CurriculumListProps> = props => (
    <Container style={props.style}>
        <Title>{props.title}</Title>
        <GrepTable
            data={props.data}
            header
            columns={props.columns}
            clickableRows
            placeholderText={"Finner ingen læreplaner."}
            onRowClick={id => props.onRowClick && props.onRowClick(id)}
        />
    </Container>
);

export default CurriculumList as React.ComponentType<CurriculumListProps>;
