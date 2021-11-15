import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { convertToRgba } from '../../../styling/hex2rgb';

interface Properties {
  open: boolean;
  indent: number;
}

export const useStyles = makeStyles(({ transitions, palette }: Theme) =>
  createStyles({
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
    expander: ({ open }: Properties) => ({
      marginLeft: '2rem',
      transform: `rotate(${open ? 180 : 0}deg)`,
      transition: transitions.create(['transform, color, background-color'], {
        duration: transitions.duration.short,
        easing: transitions.easing.easeOut,
      }),
    }),
  }),
);

export default useStyles;
