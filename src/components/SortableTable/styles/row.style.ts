import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { hex2rgba } from '../../../styling/hex2rgb';

interface Properties {
  isDragging: boolean;
}

export const useStyles = makeStyles(({ palette, transitions }: Theme) =>
  createStyles({
    row: ({ isDragging }: Properties) => ({
      transition: transitions.create(['background-color'], {
        duration: transitions.duration.shorter,
        easing: transitions.easing.easeOut,
      }),
      backgroundColor: isDragging
        ? `var(--tablecell__background--drag, ${hex2rgba(
            palette.primary.main,
            0.25,
          )})`
        : 'var(--tablecell__background)',
    }),
  }),
);

export default useStyles;
