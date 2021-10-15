import { Box, TextField, withStyles } from '@material-ui/core';

export const Container = withStyles({
  root: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
  },
})(Box);

export const ProfileField = withStyles({
  root: {
    margin: '10px 0',
  },
})(TextField);
