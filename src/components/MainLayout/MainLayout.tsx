import * as React from "react";
import { StyledMainLayout } from "./main-layout-styles";

const MainLayout: React.SFC<{}> = props => (
  <StyledMainLayout elevation={0} square>
    {props.children}
  </StyledMainLayout>
);
export default MainLayout;
