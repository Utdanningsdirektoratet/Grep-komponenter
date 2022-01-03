import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    container: {
      backgroundColor: 'rgb(241, 243, 244)',
      height: 'fit-content',
      display: 'flex',
      maxWidth: 500,
      [breakpoints.down('md')]: {
        maxWidth: 'unset',
        width: '100%',
      },
      [breakpoints.up('md')]: {
        maxWidth: 500,
      },
    },
    content: {
      backgroundColor: 'unset',
      marginRight: 20,
    },
    icon: {
      margin: '20px 10px',
      color: 'rgb(255, 158, 157)',
    },
    title: {
      backgroundColor: 'unset',
      fontSize: 16,
      margin: '20px 0',
    },
  }),
);
