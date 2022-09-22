import * as React from 'react';
import { Slide, Toolbar, useScrollTrigger } from '@mui/material';

import { StyledAppBar } from './styles';
import { makeStyles } from '../../styling';

export const useToolbarStyles = makeStyles()(({ breakpoints }) => ({
  toolbar: {
    [breakpoints.down('lg')]: {
      height: '40px',
      minHeight: '40px',
    },
    [breakpoints.up('lg')]: {
      height: '80px',
    },
  },
}));

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

const AppBar: React.FC = (props: { children?: React.ReactNode }) => {
  const { classes } = useToolbarStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <StyledAppBar color="inherit" elevation={0}>
          <Toolbar className={classes.toolbar}>{props.children}</Toolbar>
        </StyledAppBar>
      </HideOnScroll>
    </React.Fragment>
  );
};

export default AppBar as React.ComponentType;
