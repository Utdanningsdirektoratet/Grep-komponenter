import React from 'react';
import { Key } from 'ts-keycode-enum';

import {
  Theme,
  TableFooter,
  TableRow,
  TableContainer,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import Table, { TableProps } from '@material-ui/core/Table';
import { TableCellProps } from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import GrepTableRow from './grep-table-row';
import GrpeTableHeader from './grep-table-header';
import GrepTablePagination from './grep-table-pagination';
import Placeholder from './grep-table-placeholder';
import DropdownMenu, { DropdownMenuItem } from '../DropdownMenu';

export interface TableColumn<T> extends Pick<TableCellProps, 'padding'> {
  label?: string | JSX.Element;
  width?: number | string;
  colDef?: string;
  sortable?: boolean;
  forceTooltip?: boolean;
  getTooltip?: (row: T) => string;
  getCell: (row: T) => string | number | boolean | JSX.Element;
  lines?: (row: T) => number;
}

export interface GrepTableProps<T>
  extends Pick<TableProps, 'size' | 'stickyHeader'> {
  data: T[];
  columns: Array<TableColumn<T>>;
  sortBy?: string;
  header?: boolean;
  outlined?: boolean;
  // @depricated
  rowHeight?: number;
  rowsPerPage?: number;
  pagination?: boolean;
  clickableRows?: boolean;
  placeholderText?: string;
  dropdownItems?: Array<DropdownMenuItem<T>>;
  style?: React.CSSProperties;
  sortDirection?: 'desc' | 'asc';
  isRowDisabled?: (row: T) => boolean;
  onSelectedRowChange?: (row: T | null) => void;
  onRowClick?: (row: T) => any;
  menuTooltip?: (row: T) => string;
  menuDisabled?: (row: T) => boolean;
  onContextIdChanged?: (row: T) => void;
  onSortBy?: (col: TableColumn<T>) => any;
  caption?: React.ReactNode;
}

interface StyleProperties {
  outlined?: boolean;
  showHeader?: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: ({ outlined }: StyleProperties) => ({
      border: outlined ? `1px solid ${theme.palette.divider}` : 'none',
      borderCollapse: outlined ? 'separate' : 'collapse',
      tableLayout: 'auto',
    }),
    header: ({ showHeader }: StyleProperties) => ({
      visibility: showHeader ? 'visible' : 'collapse',
    }),
    body: {
      '&:focus': {
        outline: 'none',
      },
    },
  }),
);

/**
 * Since Grep-Table is so tightly intregrated into LPU and Admin some core logic could not be fixed
 * Still works but still messy
 */
export const GrepTable = <T extends any>({
  placeholderText,
  dropdownItems,
  isRowDisabled,
  pagination,
  outlined,
  columns,
  header,
  data,
  onSelectedRowChange,
  sortBy,
  sortDirection,
  onSortBy,
  onRowClick,
  size,
  caption,
  stickyHeader,
  ...props
}: GrepTableProps<T>) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 10);
  const [menuAnchor, setMenuAnchor] = React.useState<Element | null>(null);
  const [currentPage, _setCurrentPage] = React.useState<number>(0);
  const [selectedRow, _setSelectedRow] = React.useState<T | null>(null);
  const [selectedRowIndex, _setSelectedRowIndex] = React.useState<number>(0);

  const setCurrentPage = (index: number, rowIndex?: number) => {
    _setCurrentPage(index);
    _setSelectedRowIndex(rowIndex || index * rowsPerPage);
  };

  const setSelectedRow = (row: T | null) => {
    _setSelectedRow(row);
    if (row) {
      const rowIndex = data.indexOf(row);
      row &&
        setCurrentPage(Math.floor(rowIndex / rowsPerPage), data.indexOf(row));
    }
    onSelectedRowChange && onSelectedRowChange(row);
  };

  const tableRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (selectedRow) {
      const rowTab = tableRef.current?.querySelector('[tabindex="0"]');
      ((rowTab || tableRef.current) as HTMLElement)?.focus();
    }
  }, [tableRef, selectedRow]);

  React.useMemo(() => {
    setCurrentPage(0);
  }, [data.length]);

  const _openDropdown = (e: React.SyntheticEvent<Element>, row: T) => {
    const { onContextIdChanged } = props;
    setSelectedRow(row);
    if (onContextIdChanged) {
      onContextIdChanged(row);
    }
    setMenuAnchor(e.currentTarget);
  };

  const _handleButtonClick = (event: React.SyntheticEvent<Element>, row: T) => {
    event.preventDefault();
    event.stopPropagation();
    _openDropdown(event, row);
  };

  const _handleRowClick = (row: T) => {
    setSelectedRow(row);
    onRowClick && onRowClick(row);
  };

  const _handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event && event.preventDefault();
    setCurrentPage(newPage);
  };

  const _handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
  };

  const _handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const _renderCellButton = (row: T) => {
    const { menuDisabled, menuTooltip } = props;

    const disabled = menuDisabled && menuDisabled(row);
    const tooltip = menuTooltip ? menuTooltip(row) : '';
    const tabindex = row === selectedRow || !selectedRow ? 0 : -1;
    return (
      <Tooltip title={tooltip}>
        <div>
          <IconButton
            disableTouchRipple={true}
            disabled={disabled}
            style={{ float: 'right' }}
            onClick={e => _handleButtonClick(e, row)}
            onKeyDown={e => {
              switch (e.which) {
                case Key.Enter:
                  // dont show dropdown
                  e.preventDefault();
                  break;
                default:
                  break;
              }
            }}
            onFocus={() => {
              setSelectedRow(row);
            }}
            tabIndex={tabindex}
          >
            <MoreVert />
          </IconButton>
        </div>
      </Tooltip>
    );
  };

  const _renderRow = (row: T, index: number) => {
    const rowColumns = dropdownItems
      ? columns.concat([{ getCell: _renderCellButton, padding: 'none' }])
      : columns;
    const clickableRows = !!onRowClick;
    const disabled = isRowDisabled && isRowDisabled(row);
    return (
      <GrepTableRow
        key={index}
        hover={clickableRows}
        selected={selectedRow === row}
        clickable={clickableRows}
        onClick={() => {
          return !disabled && _handleRowClick(row);
        }}
        columns={rowColumns}
        row={row}
        style={{ cursor: clickableRows && !disabled ? 'pointer' : '' }}
      />
    );
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!selectedRow) {
      return;
    }

    const rowIndex = data.indexOf(selectedRow);
    const moveSelectedRow = (steps: number) => {
      const i = rowIndex + steps;
      const max = data.length - 1;
      const nextRow = data[i < 0 ? 0 : i > max ? max : i];
      nextRow && setSelectedRow(nextRow);
    };

    switch (e.keyCode) {
      case Key.DownArrow:
        moveSelectedRow(1);
        break;

      case Key.UpArrow:
        moveSelectedRow(-1);
        break;

      case Key.LeftArrow:
      case Key.PageUp:
        moveSelectedRow(-rowsPerPage);
        break;

      case Key.RightArrow:
      case Key.PageDown:
        moveSelectedRow(rowsPerPage);
        break;

      case Key.Home:
        setSelectedRow(data[0]);
        break;

      case Key.End:
        setSelectedRow(data[data.length - 1]);
        break;

      case Key.Tab:
        requestAnimationFrame(() => {
          // check is any children still has focus
          ![...(tableRef.current?.getElementsByTagName('*') || [])].some(
            el => el === document.activeElement,
          ) && setSelectedRow(null);
        });
        break;

      case Key.Enter:
        _handleRowClick(selectedRow);
        break;
    }
  };

  const rows = pagination
    ? data.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
      )
    : data;

  const classes = useStyles({ outlined, showHeader: header });

  return (
    <TableContainer style={props.style}>
      <Table className={classes.table} size={size} stickyHeader={stickyHeader}>
        {caption && <caption>{caption}</caption>}
        {
          <GrpeTableHeader
            className={classes.header}
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortBy={onSortBy}
            dropdownItems={dropdownItems}
          />
        }
        <TableBody
          ref={tableRef}
          className={classes.body}
          tabIndex={selectedRow ? -1 : 0}
          onKeyDown={onKey}
          onFocus={() => setSelectedRow(data[selectedRowIndex])}
        >
          {data.length ? (
            rows.map(_renderRow)
          ) : (
            <Placeholder columns={columns} text={placeholderText} />
          )}
        </TableBody>
        <TableFooter>
          {pagination && (
            <TableRow>
              <GrepTablePagination
                page={currentPage}
                count={data.length}
                rowsPerPage={rowsPerPage}
                onChangePage={_handlePageChange}
                onChangeRowsPerPage={_handleChangeRowsPerPage}
                labelRowsPerPage={''}
                labelDisplayedRows={({ from, to, count }) =>
                  `Viser ${from}-${to} av ${count}`
                }
              />
            </TableRow>
          )}
        </TableFooter>
      </Table>

      {dropdownItems && selectedRow && (
        <DropdownMenu
          open={!!menuAnchor}
          context={selectedRow}
          anchorEl={menuAnchor}
          menuItems={dropdownItems}
          onClose={_handleMenuClose}
        />
      )}
    </TableContainer>
  );
};

export default GrepTable;
