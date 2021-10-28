import React, { useCallback, useMemo } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DragIndicator from '@material-ui/icons/DragIndicator';

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
        const styles = makeStyle({ isDragging: isDragging });
        return (
          <TableRow
            className={styles.row}
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
