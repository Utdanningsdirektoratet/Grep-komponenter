import React, { PropsWithChildren, FunctionComponent } from 'react';
import { styled, TableCell, TableCellProps } from '@mui/material';

import { TableColumn } from '..';
import OverflowTooltip from '../../OverflowTooltip';

export interface Properties<T> extends TableCellProps {
  row?: T;
  column: TableColumn<T>;
  lines?: number;
  selected?: boolean;
}

type ComponentProperties<T> = PropsWithChildren<Properties<T>>;
export type Component<T> = FunctionComponent<ComponentProperties<T>>;

const CellValue = styled('span')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

export const GrepTableRow: Component<any> = <T,>({
  row,
  column,
  selected,
  ...props
}: Properties<T>) => {
  const {
    forceTooltip,
    getTooltip,
    getCell,
    lines = () => (selected ? undefined : 1),
  } = column;
  const { padding } = column;
  const value = (
    <CellValue style={{ WebkitLineClamp: lines(row as T) }}>
      {getCell(row as T)}
    </CellValue>
  );
  if (forceTooltip || getTooltip) {
    return (
      <TableCell padding={padding} {...props}>
        <OverflowTooltip
          force={forceTooltip}
          title={getTooltip ? getTooltip(row as T) : value}
        >
          {value}
        </OverflowTooltip>
      </TableCell>
    );
  }
  return (
    <TableCell padding={padding} {...props}>
      {value}
    </TableCell>
  );
};

export default GrepTableRow;
