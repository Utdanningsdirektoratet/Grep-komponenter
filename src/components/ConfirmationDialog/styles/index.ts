import { hex2rgba, makeStyles } from '../../../styling';

export const useStyles = makeStyles()(({ palette }) => ({
  discard: {
    color: palette.error.main,

    '&:hover': {
      backgroundColor: hex2rgba(palette.error.main, 0.1),
    },
  },
}));
