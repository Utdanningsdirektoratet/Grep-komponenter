import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { SortableTableRow2 } from './components/sortableTableRow';
import { TableColumn } from '../GrepTable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import useSortableTableStyles from './styles/row.style';
import DragIndicator from '@mui/icons-material/DragIndicator';

export interface CellNode {
  value: ReactNode;
  properties?: TableCellProps;
}

export interface dndModifiers {
  modifiers: 'restrict';
  dragOverlay: boolean;
}

// the extension makes the id a required prop for the generic
interface SortableTableProperties<T extends { id: UniqueIdentifier }> {
  columns: Array<TableColumn<T>>;
  data: T[];
  /** @default false */
  header?: boolean;
  /** @default "medium"
   * Overrides tablecell sizes
   */
  size?: 'small' | 'medium';
  /** Disables drag and drop for the component */
  disabled?: boolean;
  onChange?: (order: { id: string | number; index: number }[]) => void;
  /** Restricts possibility to drag outside the table itself
   * ref: https://docs.dndkit.com/api-documentation/modifiers */
  modifiers?: 'restrict';
}

const SortableTable = <T extends { id: UniqueIdentifier }>({
  data,
  onChange,
  ...props
}: SortableTableProperties<T>): ReactElement => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [stateItems, setStateItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState('grab');
  const { classes } = useSortableTableStyles();

  useEffect(() => {
    if (data.length > 0) {
      setStateItems([...data]);
    } else {
      setStateItems([]);
    }
  }, [data]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const size = props.size ? props.size : 'medium';
  const tableHead = props.header ? props.header : false;

  const renderRow = useCallback(
    () =>
      props.columns.map(({ getCell }, index) => {
        const currentItem = data.find((item) => item.id === activeId);
        if (currentItem === undefined) return;
        return <TableCell key={index}>{getCell(currentItem)}</TableCell>;
      }),
    [props.columns, props, activeId],
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
    setCursor('grabbing');
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over === null) return;

    if (active.id !== over.id) {
      const oldIndex = stateItems.findIndex((item) => item.id === active.id);
      const newIndex = stateItems.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(stateItems, oldIndex, newIndex);
      setStateItems(newOrder);
      onChange &&
        onChange(
          newOrder.map((record, index: number) => ({
            id: record.id,
            index,
          })),
        );
    }

    setActiveId('');
    setCursor('grab');
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={
        props?.modifiers
          ? [restrictToVerticalAxis, restrictToParentElement]
          : []
      }
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Table size={size} sx={{ cursor: cursor }}>
        {tableHead && (
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '45px' }}></TableCell>
              {props.columns.map(({ label }, index) => {
                if (!label) return;
                return (
                  <TableCell key={`header-${index}`}>
                    {label.toString().charAt(0).toUpperCase() +
                      label.toString().slice(1)}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        )}

        <SortableContext
          items={stateItems}
          strategy={verticalListSortingStrategy}
        >
          <TableBody>
            {stateItems.map((item) => (
              <SortableTableRow2
                key={item.id}
                id={item.id}
                item={item}
                columns={props.columns}
              />
            ))}
          </TableBody>
        </SortableContext>
      </Table>

      <DragOverlay>
        {activeId !== '' ? (
          <Table
            size={size}
            className={classes.dragOverlayRow}
            sx={{ cursor: cursor }}
          >
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '45px' }}>
                  <DragIndicator />
                </TableCell>
                {renderRow()}
              </TableRow>
            </TableBody>
          </Table>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableTable;
