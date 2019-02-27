import * as React from "react";
import { StyledCenterLayout } from "./center-layout-styles";

export interface CenterLayoutProps {}

const CenterLayout: React.SFC<CenterLayoutProps> = props => (
  <StyledCenterLayout square elevation={0}>
    {props.children}
  </StyledCenterLayout>
);
export default CenterLayout;
