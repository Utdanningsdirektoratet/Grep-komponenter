import * as React from "react";
import { StyledAppBar, StyledToolbar } from "./appbar-styles";

class AppBar extends React.Component<{}> {
  public render() {
    return (
      <StyledAppBar color="primary">
        <StyledToolbar>{this.props.children}</StyledToolbar>
      </StyledAppBar>
    );
  }
}

export default AppBar;
