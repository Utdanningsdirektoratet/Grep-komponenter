import { convertToRgba, makeStyles } from '../../../styling';

export const useStyles = makeStyles<{ open: boolean }>()(
  ({ palette, transitions }, open) => ({
    root: {
      padding: '0 1rem',
      transition: transitions.create(['background-color'], {
        duration: transitions.duration.short,
        easing: transitions.easing.easeIn,
      }),
      '&.Mui-focusVisible': {
        backgroundColor: convertToRgba(palette.primary.light, 0.15),
      },
    },
    subMenu: {
      margin: '0 -1rem',
    },
    expander: {
      marginLeft: '2rem',
      transform: `rotate(${open ? 180 : 0}deg)`,
      transition: transitions.create(['transform, color, background-color'], {
        duration: transitions.duration.short,
        easing: transitions.easing.easeOut,
      }),
    },
  }),
);
