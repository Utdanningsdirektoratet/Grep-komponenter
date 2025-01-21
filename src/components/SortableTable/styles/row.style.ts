import { hex2rgba, tss } from '../../../styling';

export const useStyles = tss
  .withParams<{
    isDragging: boolean;
  }>()
  .create(({ theme, isDragging }) => ({
    row: {
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      backgroundColor: isDragging
        ? `var(--tablecell__background--drag, ${hex2rgba(
            theme.palette.primary.main,
            0.25,
          )})`
        : 'var(--tablecell__background)',
    },
  }));

export default useStyles;
