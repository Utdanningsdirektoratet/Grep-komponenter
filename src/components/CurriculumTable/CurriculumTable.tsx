import * as React from 'react';
import { Container, Title } from './curriculumTableStyles';
import GrepTable, { GrepTableProps } from '../GrepTable/GrepTable';

interface CurriculumListProps<T> extends GrepTableProps<T> {
  title: string;
  style?: React.CSSProperties;
}

export default <T extends any>(props: CurriculumListProps<T>) => {
  return (
    <Container style={props.style}>
      <Title>{props.title}</Title>
      <GrepTable<T>
        header
        clickableRows
        placeholderText={'Finner ingen læreplaner.'}
        onRowClick={(id) => props.onRowClick && props.onRowClick(id)}
        {...props}
      />
    </Container>
  );
};
