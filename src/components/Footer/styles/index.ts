import { Colors, makeStyles } from '../../../styling';

export const useFooterStyles = makeStyles()((theme) => ({
  footer: {
    bottom: 0,
    width: '100%',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      minHeight: 'unset',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 50,
    },
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  item: {
    color: Colors.white,
    width: 'fit-content',
    height: '10px',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      textAlign: 'center',
      height: 'min-content',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0',
      borderRight: '1px solid',
      height: '0',
    },

    '&:last-child': {
      border: '0 !important',
    },
  },
  itemText: {
    padding: 0,
    margin: '0 auto',
  },
  itemBtn: {
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
}));
