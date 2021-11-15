import * as React from 'react';
import { Container, Title } from './styles';
import GrepTable, { GrepTableProps } from '../GrepTable';

interface GrepTableCardProps<T> extends GrepTableProps<T> {
  title: string;
}

const GrepTableCard = <T extends any>(props: GrepTableCardProps<T>) => {
  return (
    <Container style={props.style}>
      <Title>{props.title}</Title>
      <GrepTable<T> {...props} header />
    </Container>
  );
};

export default GrepTableCard;
