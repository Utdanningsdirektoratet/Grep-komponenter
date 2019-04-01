import * as React from "react";
import { StyledCenterLayout } from "./centerLayoutStyles";

export interface CenterLayoutProps {
    style?: React.CSSProperties;
}

const CenterLayout: React.FC<CenterLayoutProps> = props => (
    <StyledCenterLayout style={props.style}>
        {props.children}
    </StyledCenterLayout>
);

export default CenterLayout as React.ComponentType<CenterLayoutProps>;
