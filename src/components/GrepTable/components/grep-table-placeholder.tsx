import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell, {
  TableCellProps,
} from '@material-ui/core/TableCell/TableCell';

import { TableColumn } from '..';

interface Properties<T> extends Pick<TableCellProps, 'padding'> {
  columns: Array<TableColumn<T>>;
  text?: string;
}

type Component<T> = React.FunctionComponent<Properties<T>>;

export const GrepTablePlaceholder: Component<any> = <T extends any>({
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
