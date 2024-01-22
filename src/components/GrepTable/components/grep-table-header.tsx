import React from 'react';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TableColumn } from '..';
import TableHeaderCell from './grep-table-header-cell';
import { DropdownMenuItem } from '../../DropdownMenu';
import { onActivation } from '../../../utils/keyboard';

interface Properties<T> extends TableHeadProps {
  columns: Array<TableColumn<T>>;
  sortBy?: string;
  sortDirection?: 'desc' | 'asc';
  onSortBy?: (col: TableColumn<T>) => void;
  dropdownItems?: Array<DropdownMenuItem<T>>;
}

export const TableHeader = <T,>({
  columns,
  sortBy,
  sortDirection,
  onSortBy,
  dropdownItems,
  ...props
}: Properties<T>) => {
  const headerColumns = dropdownItems
    ? columns.concat([{ label: '', width: '48px', getCell: () => '' }])
    : columns;

  return (
    <TableHead {...props}>
      <TableRow>
        {headerColumns.map((column, index) => {
          const sortable = !!(onSortBy && column.sortable);
          const { label, colDef } = column;
          return (
            <TableHeaderCell
              key={index}
              empty={label === undefined}
              column={column}
              direction={sortDirection}
              active={sortable ? sortBy === colDef : undefined}
              onClick={() => sortable && onSortBy!(column)}
              onKeyDown={onActivation((e) => {
                if (sortable) {
                  e.preventDefault();
                  onSortBy!(column);
                }
              })}
              onSortBy={onSortBy}
              sx={column.sx}
            >
              {label}
            </TableHeaderCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
