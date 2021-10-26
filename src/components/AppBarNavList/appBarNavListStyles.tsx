import * as React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
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
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
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
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.subtitle1.fontSize,
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
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
      [breakpoints.down('md')]: {
        display: 'flex',
      },
      [breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
