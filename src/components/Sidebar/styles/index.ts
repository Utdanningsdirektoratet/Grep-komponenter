import { CSSProperties } from '@emotion/serialize';
import { makeStyles } from '../../../styling';

const textStyles: CSSProperties = {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  fontSize: 16,
};

export const useStyles = makeStyles<void, 'text'>()(
  ({ palette }, _props, classes) => {
    const text = {
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

        [`&:focus .${classes.text}`]: {
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
  },
);
