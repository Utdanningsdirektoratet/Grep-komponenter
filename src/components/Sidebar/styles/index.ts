import { CSSProperties } from 'tss-react/tools/types/CSSObject';
import { makeStyles } from '../../../styling';

const textStyles: CSSProperties = {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  fontSize: 16,
};

export const useStyles = makeStyles()(({ palette }) => ({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    cursor: 'pointer',
    color: palette.text.secondary, // @todo: https://github.com/mui-org/material-ui-pickers/issues/1681
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
}));
