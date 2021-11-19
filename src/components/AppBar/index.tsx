import * as React from 'react';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { StyledAppBar } from './styles';

interface HideOnScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
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

const AppBar: React.FC = (props: { children?: React.ReactNode }) => (
  <React.Fragment>
    <HideOnScroll {...props}>
      <StyledAppBar color="inherit" elevation={0}>
        <Toolbar>{props.children}</Toolbar>
      </StyledAppBar>
    </HideOnScroll>
    <Toolbar />
  </React.Fragment>
);

export default AppBar as React.ComponentType;
