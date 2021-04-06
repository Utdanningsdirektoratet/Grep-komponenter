import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

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
    icon: {
      minWidth: 'fit-content',
      marginRight: 2,
    },
  }),
);
