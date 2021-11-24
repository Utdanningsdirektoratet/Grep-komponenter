import { CSSProperties } from 'tss-react/tools/types/CSSObject';
import { makeStyles } from '../../../styling';

const textStyles: CSSProperties = {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  fontSize: 16,
};

export const useStyles = makeStyles()(({ palette }, _props, createRef) => {
  const text = {
    ref: createRef(),
    ...textStyles,
    color: 'inherit',
    fontWeight: 400,
  } as const;

  return {
    container: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      cursor: 'pointer',
      color: palette.text.disabled,
      outline: 'none',

      '&:hover': {
        color: palette.primary.main,
      },

      [`&:focus .${text.ref}`]: {
        color: palette.primary.main,
        outline: 'auto',
      },
    },
    text,
    selected: {
      ...textStyles,
      color: palette.primary.main,
      fontWeight: 500,
    },
    icon: {
      minWidth: 'fit-content',
      marginRight: 2,
    },
  };
});
