import { Theme } from '@material-ui/core';
import { hex2rgba } from '../../styling/hex2rgb';
import { makeStyles, createStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    discard: {
      color: palette.error.main,

      '&:hover': {
        backgroundColor: hex2rgba(palette.error.main, 0.1),
      },
    },
  }),
);
