import * as React from "react";
import { StyledAppBar } from "./appBarStyles";

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = props => (
    <StyledAppBar color="primary" elevation={0}>
        {props.children}
    </StyledAppBar>
);

export default AppBar as React.ComponentType<AppBarProps>;
