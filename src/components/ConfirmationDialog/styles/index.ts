import { hex2rgba, tss } from '../../../styling';

export const useStyles = tss.create(({ theme }) => ({
  discard: {
    color: theme.palette.error.main,

    '&:hover': {
      backgroundColor: hex2rgba(theme.palette.error.main, 0.1),
    },
  },
}));
