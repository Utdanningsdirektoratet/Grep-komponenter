import { tss } from '../../../styling';
import { CSSProperties } from 'react';

const textStyles: CSSProperties = {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  fontSize: 16,
};

export const useStyles = tss
  .withNestedSelectors<'text'>()
  .create(({ theme, classes }) => {
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
        color: theme.palette.text.disabled,
        outline: 'none',

        '&:hover': {
          color: theme.palette.primary.main,
        },

        [`&:focus .${classes.text}`]: {
          color: theme.palette.primary.main,
          outline: 'auto',
        },
      },
      text,
      selected: {
        ...textStyles,
        color: theme.palette.primary.main,
        fontWeight: 500,
      },
      icon: {
        minWidth: 'fit-content',
        marginRight: 2,
      },
    };
  });
