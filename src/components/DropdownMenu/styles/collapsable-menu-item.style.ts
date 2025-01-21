import { convertToRgba, tss } from '../../../styling';

export const useStyles = tss
  .withParams<{ open: boolean }>()
  .create(({ theme, open }) => ({
    root: {
      padding: '0 1rem',
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeIn,
      }),
      '&.Mui-focusVisible': {
        backgroundColor: convertToRgba(theme.palette.primary.light, 0.15),
      },
    },
    subMenu: {
      margin: '0 -1rem',
    },
    expander: {
      marginLeft: '2rem',
      transform: `rotate(${open ? 180 : 0}deg)`,
      transition: theme.transitions.create(
        ['transform, color, background-color'],
        {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        },
      ),
    },
  }));
