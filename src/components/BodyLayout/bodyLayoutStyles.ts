import { Box, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const StyledBodyLayout = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: 20,
      display: 'flex',
      marginBottom: 20,
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
  }),
)(Box);
