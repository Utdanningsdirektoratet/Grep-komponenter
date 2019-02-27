import * as React from "react";
import { StyledBodyLayout } from "./body-layout-styles";

export interface BodyLayoutProps {}

const BodyLayout: React.SFC<BodyLayoutProps> = props => (
  <StyledBodyLayout elevation={0} square>
    {props.children}
  </StyledBodyLayout>
);
export default BodyLayout;
