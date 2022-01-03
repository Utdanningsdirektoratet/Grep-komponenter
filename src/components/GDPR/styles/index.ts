import { Box, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

export const Container = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgb(241, 243, 244)',
      height: 'fit-content',
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        maxWidth: 'unset',
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 500,
      },
    },
  }),
)(Box);

export const Content = withStyles({
  root: {
    backgroundColor: 'unset',
    marginRight: 20,
  },
  icon: {
    margin: '20px 10px',
    color: 'rgb(255, 158, 157)',
  },
  title: {
    backgroundColor: 'unset',
    fontSize: 16,
    margin: '20px 0',
  },
});
