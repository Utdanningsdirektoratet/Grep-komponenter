import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      marginTop: 30,
      marginBottom: 10,
      alignItems: 'center',
      fontSize: 16,
    },
    current: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
    },
  }),
);
