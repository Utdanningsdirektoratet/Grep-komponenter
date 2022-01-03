import { Box, TextField, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createTheme';
import { createStyles } from '@material-ui/styles';

export const Container = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '48%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '48%',
      },
    },
  }),
)(Box);

export const ProfileField = withStyles({
  root: {
    margin: '10px 0',
  },
})(TextField);
