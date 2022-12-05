import React from 'react';
import { TableCell, TableSortLabel, TableSortLabelProps } from '@mui/material';

import { TableColumn } from '..';
import { useTableHeaderStyles } from '../styles';

interface Properties<T> extends TableSortLabelProps {
  column: TableColumn<T>;
  onSortBy?: (row: T) => void;
  empty?: boolean;
}

type Component<T> = React.FunctionComponent<Properties<T>>;

export const TableHeaderCell: Component<any> = <T,>({
  column,
  onSortBy,
  direction,
  active,
  children,
  empty = false,
  ...props
}: Properties<T>) => {
  const { classes } = useTableHeaderStyles({ column });

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
