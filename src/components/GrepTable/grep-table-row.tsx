import React from 'react';

import TableRow, { TableRowProps } from '@material-ui/core/TableRow/TableRow';

import { TableColumn } from './GrepTable';
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
}

type Component<T> = React.FunctionComponent<Properties<T>>;

export const GrepTableRow: Component<any> = <T extends any>({
  row,
  columns,
  selected,
  variant,
  clickable: _clickable,
  height: _height,
  ...props
}: Properties<T>) => {
  const render = (column: TableColumn<T>, index: number) => (
    <TableCell key={index} {...{ column, row, variant, selected }}></TableCell>
  );
  return <TableRow {...{ selected, ...props }}>{columns.map(render)}</TableRow>;
};

export default GrepTableRow;
