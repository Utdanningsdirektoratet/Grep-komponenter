import React from 'react';

import { TableColumn } from './GrepTable';
import TableSortLabel, {
  TableSortLabelProps,
} from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles, createStyles } from '@material-ui/core/styles';

interface Properties<T> extends TableSortLabelProps {
  column: TableColumn<T>;
  onSortBy?: (row: T) => void;
}

type Component<T> = React.FunctionComponent<Properties<T>>;

interface Styles<T> {
  column: TableColumn<T>;
}

export const useStyles = makeStyles(() =>
  createStyles({
    th: ({ column }: Styles<any>) => {
      const width = column.width
        ? typeof column.width === 'number'
          ? `${column.width}%`
          : column.width
        : undefined;
      return {
        width,
        fontSize: 14,
      };
    },
  }),
);

export const TableHeaderCell: Component<any> = <T extends any>({
  column,
  onSortBy,
  direction,
  active,
  children,
  ...props
}: Properties<T>) => {
  const sortable = !!(onSortBy && column.sortable);
  const classes = useStyles({ column });
  if (sortable) {
    return (
      <TableCell variant="head" className={classes.th} {...props}>
        <TableSortLabel active={active} direction={direction}>
          {children}
        </TableSortLabel>
      </TableCell>
    );
  }
  return (
    <TableCell variant="head" className={classes.th} {...props}>
      {children}
    </TableCell>
  );
};

export default TableHeaderCell;
