import Info from '@material-ui/icons/Info';
import { Box, Typography, withStyles } from '@material-ui/core';
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
})(Box);

export const Title = withStyles({
  root: {
    backgroundColor: 'unset',
    fontSize: 16,
    margin: '20px 0',
  },
})(Typography);

export const Body = withStyles({
  root: {
    backgroundColor: 'unset',

    h4: {
      marginRight: 20,
    },
  },
})(Typography);

export const StyledIcon = withStyles({
  root: {
    margin: '20px 10px',
    color: 'rgb(255, 158, 157)',
  },
})(Info);
