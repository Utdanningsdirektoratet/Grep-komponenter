import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()((theme) => ({
  tabs: {
    margin: 'auto 0',
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
    },
  },
  tab: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
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
    [theme.breakpoints.up('lg')]: {
      minWidth: 160,
      padding: '12px',
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
}));

export const useMobileStyles = makeStyles()(({ palette, breakpoints }) => ({
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
}));
