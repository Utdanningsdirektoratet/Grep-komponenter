import {
  Button,
  withStyles,
  withTheme,
  Theme,
  createStyles,
} from '@material-ui/core';

export const PaginationTextButton = withStyles({
  root: {
    textTransform: 'capitalize',
    fontWeight: 'initial',
    fontSize: 12,
  },
})(Button);

const buttonStyles = ({ palette }: Theme) =>
  createStyles({
    root: {
      minWidth: '18px',
      minHeight: '20px',
      padding: '0 6px',
      margin: '0 8px',
      borderRadius: '2px',
      fontSize: 12,
      backgroundColor: palette.primary.main,
    },
  });

export const PaginationButton = withTheme(withStyles(buttonStyles)(Button));
