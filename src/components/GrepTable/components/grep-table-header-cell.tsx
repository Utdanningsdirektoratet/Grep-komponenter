import React from 'react';
import { TableCell, TableSortLabel, TableSortLabelProps } from '@mui/material';

import { TableColumn } from '..';
import { useTableHeaderStyles } from '../styles';

interface Properties<T> extends Omit<TableSortLabelProps, 'component'> {
  column: TableColumn<T>;
  onSortBy?: (col: TableColumn<T>) => void;
  empty?: boolean;
}

export const TableHeaderCell = <T,>({
  column,
  onSortBy,
  direction,
  active,
  children,
  empty = false,
  ...props
}: Properties<T>) => {
  const { classes } = useTableHeaderStyles({
    column: column as TableColumn<unknown>,
  });

  const sortable = !!(onSortBy && column.sortable);

  if (sortable && !empty) {
    return (
      <TableCell
        variant={empty ? 'body' : 'head'}
        className={classes.th}
        {...props}
      >
        <TableSortLabel active={active} direction={direction}>
          {children}
        </TableSortLabel>
      </TableCell>
    );
  }

  return empty ? (
    <td className={classes.th}>{children}</td>
  ) : (
    <TableCell
      variant={empty ? 'body' : 'head'}
      className={classes.th}
      {...props}
    >
      {children}
    </TableCell>
  );
};

export default TableHeaderCell;
