import { Box, withStyles, createStyles } from '@material-ui/core';

export const StyledBodyLayout = withStyles(() =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: 20,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'space-between',
    },
  }),
)(Box);
