import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Colors from '../../styling/Colors';

export const useFooterStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      bottom: 0,
      minHeight: 50,
      width: '100%',
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
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
        margin: '4px auto',
      },
      [theme.breakpoints.up('md')]: {
        margin: '0',
        borderRight: '1px solid',
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
  }),
);
