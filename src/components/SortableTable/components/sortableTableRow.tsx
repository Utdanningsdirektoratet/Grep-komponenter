import React, { ReactElement, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';
import TableRow from '@mui/material/TableRow';
import { TableColumn } from '../../GrepTable';
import TableCell from '@mui/material/TableCell';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { hex2rgba } from '../../../styling/hex2rgb';

interface props<T> extends Omit<React.HTMLProps<HTMLTableRowElement>, 'id'> {
  id: UniqueIdentifier;
  item: T;
  columns: Array<TableColumn<T>>;
}

export function SortableTableRow2<T>({
  id,
  columns,
  item,
  ...props
}: props<T>): ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderRow = useCallback(
    () =>
      columns.map(({ getCell }, index) => {
        return <TableCell key={index}>{getCell(item)}</TableCell>;
      }),
    [columns, item],
  );

  return (
    <TableRow
      hover
      id={id as string}
      // https://docs.dndkit.com/api-documentation/sensors/pointer#touch-action
      sx={(theme) => ({
        touchAction: 'none',
        ':focus-visible': {
          boxShadow: `0px 0px 3px 3px ${hex2rgba(theme.palette.primary.main, 0.25)}`,
        },
      })}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...props}
    >
      <TableCell sx={{ width: '45px' }}>
        <DragIndicator />
      </TableCell>
      {renderRow()}
    </TableRow>
  );
}
