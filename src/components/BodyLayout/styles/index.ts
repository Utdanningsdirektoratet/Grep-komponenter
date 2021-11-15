import { Box, withStyles } from '@material-ui/core';

export const StyledBodyLayout = withStyles({
  root: {
    width: '100%',
    paddingTop: 20,
    display: 'flex',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
})(Box);
