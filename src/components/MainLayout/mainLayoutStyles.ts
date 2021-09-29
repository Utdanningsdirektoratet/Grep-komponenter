import { Box, withStyles } from '@material-ui/core';

export const StyledMainLayout = withStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
})(Box);
