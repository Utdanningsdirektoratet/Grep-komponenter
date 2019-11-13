import * as React from 'react';
import {
  Title,
  PageLink,
  StyledLink,
  StyledArrow,
  Container,
} from './linkListStyles';
import { NavigationProps } from '..';

interface Props {
  title: string;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

const LinkList: React.FC<Props> = props => (
  <Container>
    <Title>{props.title}</Title>
    <React.Fragment>
      {props.pages.map(page => (
        <PageLink key={page.id} onClick={() => props.onPageClick(page)}>
          <StyledLink>{page.label}</StyledLink>
          <StyledArrow />
        </PageLink>
      ))}
    </React.Fragment>
  </Container>
);

export default LinkList as React.ComponentType<Props>;
