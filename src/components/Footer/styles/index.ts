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
      minHeight: '100px',
    },
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '14px',
  },
  content: {
    padding: '0 40px 0 40px',
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      a: {
        width: '150px',
        margin: '40px auto 40px auto',
      },
    },
    [theme.breakpoints.up('md')]: { flexDirection: 'row' },
  },
  serviceNameText: {
    color: Colors.white,
    textAlign: 'center',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      marginBottom: '30px',
    },
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
  },
  item: {
    color: Colors.white,
    width: 'fit-content',
    margin: '0',
    height: '10px',
    gap: '10px',
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      width: 'filter-content',
    },

    '&:last-child': {
      border: '0 !important',
    },
  },
  itemText: {
    padding: 0,
    margin: '0 auto',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '14px',
  },
  itemBtn: {
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
}));
