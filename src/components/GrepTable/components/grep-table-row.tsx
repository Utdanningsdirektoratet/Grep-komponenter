import React from 'react';
import { TableRow, TableRowProps } from '@mui/material';

import { TableColumn } from '../';
import TableCell, {
  Properties as TableCellProperties,
} from './grep-table-cell';

interface Properties<T>
  extends TableRowProps,
    Pick<TableCellProperties<T>, 'variant'> {
  row: T;
  columns: Array<TableColumn<T>>;
  clickable?: boolean;
  height?: number;
  underlineOnFocus?: boolean;
  expanded?: boolean;
}

type Component<T> = React.FunctionComponent<Properties<T>>;

export const GrepTableRow: Component<any> = <T,>({
  row,
  columns,
  selected,
  expanded,
  variant,
  clickable: _clickable,
  height: _height,
  underlineOnFocus,
  ...props
}: Properties<T>) => {
  const render = (column: TableColumn<T>, index: number) => (
    <TableCell
      key={index}
      expanded={expanded}
      {...{ column, row, variant, selected }}
    ></TableCell>
  );
  return (
    <TableRow
      sx={{
        ':focus': { textDecoration: underlineOnFocus ? 'underline' : 'none' },
      }}
      tabIndex={props.tabIndex}
      {...{ selected, ...props }}
    >
      {columns.map(render)}
    </TableRow>
  );
};

export default GrepTableRow;
