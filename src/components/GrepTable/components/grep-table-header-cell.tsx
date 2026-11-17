import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableSortLabel, {
  TableSortLabelProps,
} from '@mui/material/TableSortLabel';

import { TableColumn } from '..';

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
  const width = column.width
    ? typeof column.width === 'number'
      ? `${column.width}%`
      : `${column.width}px`
    : undefined;

  const sortable = !!(onSortBy && column.sortable);

  if (sortable && !empty) {
    return (
      <TableCell
        variant={empty ? 'body' : 'head'}
        sx={{ width: width, fontSize: 14, ...props.sx }}
        {...props}
      >
        <TableSortLabel active={active} direction={direction}>
          {children}
        </TableSortLabel>
      </TableCell>
    );
  }

  return empty ? (
    <td style={{ width: width, fontSize: 14 }}>{children}</td>
  ) : (
    <TableCell
      variant={empty ? 'body' : 'head'}
      sx={{ width: width, fontSize: 14, ...props.sx }}
      {...props}
    >
      {children}
    </TableCell>
  );
};

export default TableHeaderCell;
