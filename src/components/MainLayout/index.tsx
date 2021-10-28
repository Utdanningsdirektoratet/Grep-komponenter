import * as React from 'react';
import { StyledMainLayout } from './styles';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => (
  <StyledMainLayout>{props.children}</StyledMainLayout>
);

export default MainLayout as React.ComponentType<MainLayoutProps>;
