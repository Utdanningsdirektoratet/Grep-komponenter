import * as React from 'react';
import { StyledFooter } from './footerStyles';

interface FooterProps {
  children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = props => (
  <StyledFooter>{props.children}</StyledFooter>
);

export default Footer as React.ComponentType<FooterProps>;
