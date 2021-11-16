import { Box, Typography, withStyles } from '@material-ui/core';

export const Container = withStyles({
  root: {
    display: 'flex',
    padding: '16px 8px',
    width: 'fit-content',
    height: 'fit-content',
    alignItems: 'center',
    float: 'right',
  },
})(Box);

export const UserContainer = withStyles({
  root: {
    margin: '0 10px',
    marginLeft: 20,
    height: 'fit-content',
    textAlign: 'left',
    backgroundColor: 'inherit',
    textTransform: 'none',
  },
})(Box);

export const UserName = withStyles({
  root: {
    fontSize: 16,
  },
})(Typography);

export const UserRole = withStyles({
  root: {
    fontSize: 12,
  },
})(Typography);
