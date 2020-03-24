import React from 'react';

import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { TableColumn } from './GrepTable';

interface Properties<T> {
  columns: Array<TableColumn<T>>;
  text?: string;
}

type Component<T> = React.FunctionComponent<Properties<T>>;

export const GrepTablePlaceholder: Component<any> = <T extends any>({
  columns,
  text = 'Tabellen er tom.',
}: Properties<T>) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>{text}</TableCell>
    </TableRow>
  );
};

export default GrepTablePlaceholder;
