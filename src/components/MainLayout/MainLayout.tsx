import * as React from "react";
import { StyledMainLayout } from "./main-layout-styles";

export interface MainLayoutProps {}

const MainLayout: React.SFC<MainLayoutProps> = props => (
  <StyledMainLayout elevation={0} square>
    {props.children}
  </StyledMainLayout>
);
export default MainLayout as React.ComponentType<MainLayoutProps>;
