import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { CSSProperties } from '@material-ui/styles';

const textStyles: CSSProperties = {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  fontSize: 16,
};

export const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      cursor: 'pointer',
      color: palette.text.hint,
      outline: 'none',

      '&:hover': {
        color: palette.primary.main,
      },

      '&:focus > $text': {
        color: palette.primary.main,
        outline: 'auto',
      },
    },
    text: {
      ...textStyles,
      color: 'inherit',
      fontWeight: 400,
    },
    selected: {
      ...textStyles,
      color: palette.primary.main,
      fontWeight: 500,
    },
  }),
);
