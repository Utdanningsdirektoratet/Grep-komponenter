import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { TableCellProps } from '@mui/material/TableCell';

import { TableColumn } from '..';
import OverflowTooltip from '../../OverflowTooltip';

export interface Properties<T> extends TableCellProps {
  row?: T;
  column: TableColumn<T>;
  lines?: number;
  selected?: boolean;
  expanded?: boolean;
}

const CellValue = styled('span')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

export const GrepTableCell = <T,>({
  row,
  column,
  expanded,
  ...props
}: Properties<T>) => {
  const {
    forceTooltip,
    getTooltip,
    getCell,
    lang,
    lines = () => (expanded ? undefined : 1),
  } = column;
  const { padding } = column;
  const value = (
    <CellValue
      style={{ WebkitLineClamp: lines(row as T) }}
      lang={typeof lang === 'string' ? lang : lang ? lang(row as T) : ''}
    >
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

export default GrepTableCell;
