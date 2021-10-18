import * as React from 'react';
import { Container, Title } from './grepTableCardStyles';
import GrepTable, { GrepTableProps } from '../GrepTable/GrepTable';

interface GrepTableCardProps<T> extends GrepTableProps<T> {
  title: string;
  style?: React.CSSProperties;
}

const GrepTableCard = <T extends any>(props: GrepTableCardProps<T>) => {
  return (
    <Container style={props.style}>
      <Title>{props.title}</Title>
      <GrepTable<T>
        header
        clickableRows
        onRowClick={(id) => props.onRowClick && props.onRowClick(id)}
        {...props}
      />
    </Container>
  );
};

export default GrepTableCard;
