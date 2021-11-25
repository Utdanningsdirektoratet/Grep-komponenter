import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()(() => ({
  root: {
    listStyle: 'none',
    padding: 0,
    '& ul': {
      fontSize: '.9em',
    },
  },
}));
