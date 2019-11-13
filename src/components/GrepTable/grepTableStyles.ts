import CleanPaper from '../CleanPaper';
import Colors from '../../styling/Colors';
import { createStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Button,
  withStyles,
  withTheme,
  Theme,
  makeStyles,
} from '@material-ui/core';

export const Container = withStyles({
  root: {},
})(CleanPaper);

export const StyledTable = withStyles({
  root: {
    tableLayout: 'fixed',
  },
})(Table);

export const StyledTableBody = withStyles({
  root: {},
})(TableBody);

const tableRowStyles = createStyles({
  root: {
    border: `1px solid ${Colors.lightGrey}`,
    whiteSpace: 'nowrap',
  },
});

export const StyledTableHeader = withStyles({
  root: {
    ...tableRowStyles.root,
  },
})(TableHead);

export const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export const ClickableTableRow = withStyles({
  root: {
    ...tableRowStyles.root,
    cursor: 'pointer',

    '&:hover': {
      background: `${Colors.hoverGrey}`,
    },
  },
})(TableRow);

export const StyledTableCell = withStyles({
  root: {
    padding: '4px 0px',
    paddingLeft: 15,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 14,
  },
})(TableCell);

export const StyledTableFooter = withStyles({})(TableFooter);

export const paginationStyles = makeStyles(
  createStyles({
    toolbar: {
      padding: 0,
      width: '100%',
      display: 'grid',
      gridTemplateAreas: "'left right'",
    },
    input: {
      gridArea: 'left',
      justifySelf: 'start',
    },
    caption: {
      gridArea: 'left',
      paddingLeft: '60px',
    },
    spacer: {
      display: 'none',
    },
  }),
);

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
