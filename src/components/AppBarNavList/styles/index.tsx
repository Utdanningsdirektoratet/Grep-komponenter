import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { makeStyles, Theme } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<unknown>, newValue: number) => void;
}

export const StyledTabs = withStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto 0',
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
      [theme.breakpoints.up('lg')]: {
        display: 'grid',
      },
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
      },
    },
  }),
)((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
));

interface StyledTabProps {
  label: string;
}

export const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'uppercase',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      fontSize: theme.typography.subtitle1.fontSize,
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
      [theme.breakpoints.down('lg')]: {
        minWidth: 120,
        marginRight: 0,
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: 160,
        padding: '12px',
      },
    },
  }),
)((props: StyledTabProps) => <Tab disableTouchRipple {...props} />);

export const useMobileStyles = makeStyles(({ palette, breakpoints }) =>
  createStyles({
    mobileNavList: {
      backgroundColor: `transparent`,
      color: palette.primary.main,
      fontFamily: 'MontSerrat, Helvetica Neue, Helvetica, Arial, sans-serif',
      [breakpoints.down('lg')]: {
        display: 'flex',
      },
      [breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  }),
);
