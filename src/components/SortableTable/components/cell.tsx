import React, { useRef, useMemo } from 'react';
import TableCell, { TableCellProps } from '@mui/material/TableCell';

export interface Properties extends TableCellProps {
  locked: boolean;
}

const setDimensions = (el: HTMLElement): void => {
  const { width, height } = el.getBoundingClientRect();
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
};

const clearDimensions = (el: HTMLElement): void => {
  el.style.removeProperty('height');
  el.style.removeProperty('width');
};

export function SortableTableCell({
  locked,
  children,
  ...props
}: React.PropsWithChildren<Properties>): JSX.Element {
  const ref = useRef<HTMLElement>();
  useMemo(() => {
    if (ref.current) {
      locked ? setDimensions(ref.current) : clearDimensions(ref.current);
    }
  }, [locked]);
  return (
    <TableCell ref={ref} {...props}>
      {children}
    </TableCell>
  );
}

export default SortableTableCell;
