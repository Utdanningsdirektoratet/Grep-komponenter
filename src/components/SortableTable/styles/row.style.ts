import { hex2rgba, makeStyles } from '../../../styling';

export const useStyles = makeStyles<{
  isDragging: boolean;
}>()(({ palette, transitions }, { isDragging }) => ({
  row: {
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
  },
}));

export default useStyles;
