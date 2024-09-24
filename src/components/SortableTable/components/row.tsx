import React, { useCallback, useMemo } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DragIndicator from '@mui/icons-material/DragIndicator';

import SortableTableCell from './cell';

import makeStyle from '../styles/row.style';
import { CellNode } from '..';

interface Properties<T> {
  id: string | number;
  item: T;
  index: number;
  disabled?: boolean;
  render: (item: T) => CellNode[];
}

export function SortableTableRow<T>({
  item,
  id,
  index,
  render,
  disabled,
}: Properties<T>): JSX.Element {
  const cells = useMemo(() => render(item), [item, render]);
  const renderRow = useCallback(
    (isDragging: boolean) =>
      cells.map(({ value, properties }, index) => (
        <SortableTableCell
          key={`dragable-${id}-${index}`}
          locked={isDragging}
          {...properties}
        >
          {value}
        </SortableTableCell>
      )),
    [cells, id],
  );
  return (
    <Draggable
      draggableId={`dragable-${id}`}
      index={index}
      isDragDisabled={disabled}
    >
      {(provided, { isDragging }): JSX.Element => {
        const { classes } = makeStyle({ isDragging: isDragging });
        return (
          <TableRow
            className={classes.row}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <TableCell
              style={{ width: '45px', padding: '5px 10px' }}
              {...provided.dragHandleProps}
            >
              <DragIndicator></DragIndicator>
            </TableCell>
            {renderRow(isDragging)}
          </TableRow>
        );
      }}
    </Draggable>
  );
}

export default SortableTableRow;
