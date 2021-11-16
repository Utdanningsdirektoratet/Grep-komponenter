import { Box, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

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
