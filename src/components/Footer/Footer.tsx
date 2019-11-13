import * as React from 'react';
import { StyledFooter } from './footerStyles';

interface FooterProps {}

const Footer: React.FC<FooterProps> = props => (
  <StyledFooter>{props.children}</StyledFooter>
);

export default Footer as React.ComponentType<FooterProps>;
