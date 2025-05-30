import React, { useState, useMemo, useCallback, ReactNode, JSX } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
} from '@hello-pangea/dnd';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import { TableHead, TableRow } from '@mui/material';
import { TableCellProps } from '@mui/material/TableCell';

import TableCell from './components/cell';
import SortableTableRow from './components/row';

export interface CellNode {
  value: ReactNode;
  properties?: TableCellProps;
}

interface Properties<T = unknown> {
  columns: Array<keyof T>;
  items: T[];
  disabled?: boolean;
  identify: (item: T) => string | number;
  headerValue?: (column: keyof T) => CellNode | ReactNode;
  cellValue?: (column: keyof T, item: T) => CellNode | ReactNode;
  onChange?: (order: { id: string | number; index: number }[]) => void;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
}

function castCellNode(value: CellNode | ReactNode): CellNode {
  return typeof value === 'object' && (value as CellNode).value !== undefined
    ? (value as CellNode)
    : ({ value } as CellNode);
}

export const SortableTable = <T,>({
  columns,
  items,
  identify,
  headerValue,
  cellValue,
  disabled,
  onChange,
}: Properties<T>): JSX.Element => {
  const [records, setRecords] = useState<T[]>(items);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useMemo(() => {
    return setRecords(items);
  }, [items]);

  const onDragStart = (): void => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult): void => {
    setIsDragging(false);
    if (result.destination) {
      const newOrder = reorder(
        records,
        result.source.index,
        result.destination.index,
      );
      setRecords(newOrder);
      onChange &&
        onChange(
          newOrder.map((record, index: number) => ({
            id: identify(record),
            index,
          })),
        );
    }
  };

  const headers = useMemo(() => {
    return columns.map((column) =>
      castCellNode(headerValue ? headerValue(column) : (column as string)),
    );
  }, [columns, headerValue]);

  const getCellValue = useCallback(
    (column: keyof T, item: T) => {
      return castCellNode(
        cellValue ? cellValue(column, item) : (item[column] as string),
      );
    },
    [cellValue],
  );

  const render = useCallback(
    (item: T): CellNode[] =>
      columns.map((column) => getCellValue(column, item)),
    [columns, getCellValue],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell locked={isDragging} />
          {headers.map(({ value, properties }, index) => {
            return (
              <TableCell
                key={`header-${index}`}
                locked={isDragging}
                {...properties}
              >
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragStart}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided: DroppableProvided): JSX.Element => (
            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
              {records.map((item, index) => {
                const props = {
                  id: identify(item),
                  item,
                  index,
                  render,
                  disabled,
                };
                return (
                  <SortableTableRow<T> key={`item-${props.id}`} {...props} />
                );
              })}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  );
};

// export const FormDefault = memo(SortableTable) as typeof SortableTable;

export default SortableTable;
