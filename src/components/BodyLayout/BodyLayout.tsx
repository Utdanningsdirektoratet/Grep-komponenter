import * as React from "react";
import { StyledBodyLayout } from "./body-layout-styles";

const BodyLayout: React.SFC<{}> = props => (
  <StyledBodyLayout elevation={0} square>
    {props.children}
  </StyledBodyLayout>
);
export default BodyLayout;
