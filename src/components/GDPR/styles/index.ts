import Info from '@material-ui/icons/Info';
import { Box, Typography, withStyles } from '@material-ui/core';

export const Container = withStyles({
  root: {
    backgroundColor: 'rgb(241, 243, 244)',
    height: 'fit-content',
    display: 'flex',
    maxWidth: 500,
  },
})(Box);

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
