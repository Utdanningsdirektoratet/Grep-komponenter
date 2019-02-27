import * as React from "react";
import { StyledAppBar, StyledToolbar } from "./appbar-styles";

export interface AppBarProps {}

class AppBar extends React.Component<AppBarProps> {
  public render() {
    return (
      <StyledAppBar color="primary">
        <StyledToolbar>{this.props.children}</StyledToolbar>
      </StyledAppBar>
    );
  }
}

export default AppBar as React.ComponentType<AppBarProps>;
