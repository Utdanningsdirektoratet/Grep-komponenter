import React, { useState, useMemo, useCallback, ReactNode } from 'react';

import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
} from 'react-beautiful-dnd';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';

import MyRow from './row';
import { TableHead, TableRow } from '@material-ui/core';
import { TableCellProps } from '@material-ui/core/TableCell';

import TableCell from './cell';

export interface CellNode {
  value: ReactNode;
  properties?: TableCellProps;
}

interface Properties<T> {
  columns: Array<keyof T>;
  items: T[];
  disabled?: boolean;
  identify: (item: T) => string;
  headerValue?: (column: keyof T) => CellNode | ReactNode;
  cellValue?: (column: keyof T, item: T) => CellNode | ReactNode;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
}

function castCellNode(value: CellNode | ReactNode): CellNode {
  return typeof value === 'object' && (value as CellNode).value !== undefined
    ? (value as CellNode)
    : { value };
}

export function SortableList<T>({
  columns,
  items,
  identify,
  headerValue,
  cellValue,
  disabled,
}: Properties<T>): JSX.Element {
  const [records, setRecords] = useState<T[]>(items);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragStart = (): void => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult): void => {
    setIsDragging(false);
    if (result.destination) {
      setRecords(
        reorder(records, result.source.index, result.destination.index),
      );
    }
  };

  const headers = useMemo(() => {
    return columns.map(column =>
      castCellNode(headerValue ? headerValue(column) : column),
    );
  }, [columns]);

  const getCellValue = useCallback(
    (column: keyof T, item: T) => {
      return castCellNode(cellValue ? cellValue(column, item) : item[column]);
    },
    [cellValue],
  );

  const render = useCallback(
    (item: T): CellNode[] => columns.map(column => getCellValue(column, item)),
    [columns],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {!disabled && <TableCell locked={isDragging} />}
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
                return <MyRow<T> key={`item-${props.id}`} {...props} />;
              })}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  );
}

export default SortableList as React.FunctionComponent;
