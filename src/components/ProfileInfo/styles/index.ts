import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()((theme) => ({
  container: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '48%',
    },
  },
}));
