import React from 'react';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableColumn } from '..';

interface Properties<T> extends Pick<TableCellProps, 'padding'> {
  columns: Array<TableColumn<T>>;
  text?: string;
}

export const GrepTablePlaceholder = <T,>({
  columns,
  padding,
  text = 'Tabellen er tom.',
}: Properties<T>) => {
  return (
    <TableRow>
      <TableCell padding={padding} colSpan={columns.length}>
        {text}
      </TableCell>
    </TableRow>
  );
};

export default GrepTablePlaceholder;
