import * as React from 'react';
import { Container, Title, Body, Content, StyledIcon } from './gdprStyles';

const GDPR: React.FC = props => (
  <Container>
    <StyledIcon />
    <Content>
      <Title>Personlig informasjon og personvern</Title>
      <Body>{props.children}</Body>
    </Content>
  </Container>
);

export default GDPR as React.ComponentType;
