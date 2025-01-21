import { tss } from '../../../styling';

export const useStyles = tss.create(({ theme }) => ({
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
