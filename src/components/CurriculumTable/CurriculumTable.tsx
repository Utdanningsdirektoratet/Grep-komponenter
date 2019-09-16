import * as React from "react";
import { Container, Title } from "./curriculumTableStyles";
import GrepTable, { IGrepTableProps } from "../GrepTable/GrepTable";

interface CurriculumListProps<T extends Object> extends IGrepTableProps<T> {
    title: string;
    style?: React.CSSProperties;
}

export default <T extends Object>(props: CurriculumListProps<T>) => {
    return (
        <Container style={props.style}>
            <Title>{props.title}</Title>
            <GrepTable<T>
                data={props.data}
                header
                columns={props.columns}
                clickableRows
                placeholderText={"Finner ingen læreplaner."}
                onRowClick={id => props.onRowClick && props.onRowClick(id)}
            />
        </Container>
    );
};
