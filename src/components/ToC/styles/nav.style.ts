import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()(() => ({
  root: {
    fontSize: 18,
    overflowY: 'scroll',
    outline: 'none',

    '&::-webkit-scrollbar': {
      width: 0 /* Remove scrollbar space */,
      background: 'transparent' /* Optional: just make scrollbar invisible */,
    },
  },
}));
