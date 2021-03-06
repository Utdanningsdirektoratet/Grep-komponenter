import { makeStyles, createStyles } from '@material-ui/core/styles';
import { convertToRgba } from '../../../styling';

export const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      fontSize: 18,
      overflowY: 'scroll',
      outline: 'none',

      '&::-webkit-scrollbar': {
        width: 0 /* Remove scrollbar space */,
        background: 'transparent' /* Optional: just make scrollbar invisible */,
      },
    },
    keyboardHint: {
      position: 'relative',
      '&::after': {
        content: '"innholdsfortegnelse: [ alt + i ]"',
        fontSize: 12,
        position: 'absolute',
        display: 'block',
        top: 5,
        right: 5,
        background: convertToRgba('#000', 0.1),
        padding: '2px 5px',
      },
    },
  });
});

export default useStyles;
