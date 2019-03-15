import * as React from "react";
import { StyledCenterLayout } from "./centerLayoutStyles";

export interface CenterLayoutProps {}

const CenterLayout: React.FC<CenterLayoutProps> = props => (
    <StyledCenterLayout>{props.children}</StyledCenterLayout>
);

export default CenterLayout as React.ComponentType<CenterLayoutProps>;
