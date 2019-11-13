import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { StyledAppBar } from './appBarStyles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export interface AppBarProps {}

interface IHideOnScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll: React.FC<IHideOnScrollProps> = ({ children }) => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const AppBar: React.FC<AppBarProps> = props => (
  <React.Fragment>
    <HideOnScroll {...props}>
      <StyledAppBar color="inherit" elevation={0}>
        <Toolbar>{props.children}</Toolbar>
      </StyledAppBar>
    </HideOnScroll>
    <Toolbar />
  </React.Fragment>
);

export default AppBar as React.ComponentType<AppBarProps>;
