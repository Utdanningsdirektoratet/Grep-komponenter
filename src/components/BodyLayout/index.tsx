import * as React from 'react';
import { StyledBodyLayout } from './styles';

export interface BodyLayoutProps {
  children?: React.ReactNode;
}

const BodyLayout: React.FC<BodyLayoutProps> = (props) => (
  <StyledBodyLayout>{props.children}</StyledBodyLayout>
);

export default BodyLayout as React.ComponentType<BodyLayoutProps>;
