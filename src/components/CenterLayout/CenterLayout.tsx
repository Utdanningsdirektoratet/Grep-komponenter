import * as React from "react";
import { StyledCenterLayout } from "./center-layout-styles";

const CenterLayout: React.SFC<{}> = props => (
  <StyledCenterLayout square elevation={0}>
    {props.children}
  </StyledCenterLayout>
);
export default CenterLayout;
