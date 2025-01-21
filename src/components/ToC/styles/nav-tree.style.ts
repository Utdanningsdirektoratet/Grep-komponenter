import { tss } from '../../../styling';

export const useStyles = tss.create(() => ({
  root: {
    listStyle: 'none',
    padding: 0,
    '& ul': {
      fontSize: '.9em',
    },
  },
}));
