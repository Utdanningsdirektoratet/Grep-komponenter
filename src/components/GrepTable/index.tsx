import React, { useCallback } from 'react';
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

import GrepTableRow from './components/grep-table-row';
import GrpeTableHeader from './components/grep-table-header';
import GrepTablePagination from './components/grep-table-pagination';
import Placeholder from './components/grep-table-placeholder';
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
  extends Pick<TableProps, 'size' | 'stickyHeader' | 'padding'> {
  data: T[];
  columns: Array<TableColumn<T>>;
  sortBy?: string;
  header?: boolean;
  outlined?: boolean;
  rowsPerPage?: number;
  pagination?: boolean;
  /**
   * @deprecated No longer in use.
   */
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
  /**
   * @deprecated No longer in use.
   */
  rowHeight?: number;
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

const containsFocus = (el: HTMLElement, tag = '*') =>
  Array.from(el.getElementsByTagName(tag)).some(
    (el) => el === document.activeElement,
  );

const getElementIndex = (el: Element): number =>
  Number(el.getAttribute('data-index') || -1);
/**
 * Since Grep-Table is so tightly intregrated into LPU and Admin some core logic could not be fixed
 * Still works but still messy
 *
 * @todo enhance page handling
 *
 */
export const GrepTable = <T,>({
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
  padding,
  ...props
}: GrepTableProps<T>) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 10);
  const [menuAnchor, setMenuAnchor] = React.useState<Element | null>(null);
  const [currentPage, _setCurrentPage] = React.useState<number>(0);
  const [selectedRowIndex, _setSelectedRowIndex] = React.useState<number>();
  const [dropdownContext, setDropdownContext] = React.useState<T>();

  const selectedRow = data[selectedRowIndex!] || null;

  const setCurrentPage = useCallback(
    (index: number, rowIndex?: number) => {
      index = pagination && index >= 0 ? index : 0;
      _setCurrentPage(index);
      _setSelectedRowIndex(rowIndex);
    },
    [_setCurrentPage, _setSelectedRowIndex, rowsPerPage, pagination],
  );

  const setSelectedRowIndex = (index: number) => {
    const hasIndexChanged = index === selectedRowIndex;
    const pageIndex = Math.floor(index / rowsPerPage);
    setCurrentPage(pageIndex, index);
    if (hasIndexChanged && onSelectedRowChange) {
      onSelectedRowChange(data[index]);
    }
  };

  const setSelectedElement = (el: Element) =>
    setSelectedRowIndex(getElementIndex(el));

  const tableRef = React.useRef<HTMLTableSectionElement | null>(null);

  // focus selected row first tabable item
  React.useEffect(() => {
    const rowTab = tableRef.current?.querySelector(
      `[data-index="${selectedRowIndex}"]`,
    ) as HTMLElement;
    if (!rowTab) return;
    if (!containsFocus(rowTab)) {
      if (rowTab.getAttribute('tabindex') === '0') {
        rowTab.focus();
      }
    }
  }, [tableRef, selectedRowIndex]);

  React.useMemo(() => {
    setCurrentPage(0);
  }, [data.length, setCurrentPage]);

  const _openDropdown = (e: React.SyntheticEvent<Element>, row: T) => {
    const { onContextIdChanged } = props;
    if (onContextIdChanged) {
      onContextIdChanged(row);
    }
    setDropdownContext(row);
    setMenuAnchor(e.currentTarget);
  };

  const _handleRowClick = useCallback(
    (row: T) => {
      const disabled = isRowDisabled && isRowDisabled(row);
      !disabled && onRowClick && onRowClick(row);
    },
    [onRowClick],
  );

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
    return (
      <Tooltip title={tooltip} placement="bottom">
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            disableTouchRipple={true}
            disabled={disabled}
            style={{ float: 'right' }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              _openDropdown(e, row);
            }}
            onKeyDown={(e) => {
              switch (e.which) {
                case Key.Enter:
                  // dont show dropdown
                  e.preventDefault();
                  break;
                default:
                  break;
              }
            }}
            tabIndex={0}
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
    const rowIndex = index + currentPage * rowsPerPage;
    return (
      <GrepTableRow
        key={rowIndex}
        data-index={rowIndex}
        tabIndex={0}
        hover={clickableRows}
        selected={rowIndex === selectedRowIndex}
        clickable={clickableRows}
        onMouseDown={({ currentTarget }) => {
          setSelectedElement(currentTarget);
          _handleRowClick(row);
        }}
        columns={rowColumns}
        row={row}
        style={{ cursor: clickableRows && !disabled ? 'pointer' : '' }}
        onFocus={({ currentTarget }) => setSelectedElement(currentTarget)}
      />
    );
  };

  const onKey = (e: React.KeyboardEvent) => {
    const maxIndex = data.length - 1;
    const moveSelectedRow = (steps: number) => {
      const i = (selectedRowIndex || 0) + steps;
      if (i >= 0 && i <= maxIndex) {
        setSelectedRowIndex(i);
      }
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
        setSelectedRowIndex(0);
        break;

      case Key.End:
        setSelectedRowIndex(maxIndex);
        break;

      case Key.Tab:
        requestAnimationFrame(() => {
          // check is any children still has focus
          !containsFocus(tableRef.current!) && setSelectedRowIndex(-1);
        });
        break;

      case Key.Enter:
        selectedRow && _handleRowClick(selectedRow);
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
      <Table
        className={classes.table}
        size={size}
        stickyHeader={stickyHeader}
        padding={padding}
      >
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
        <TableBody ref={tableRef} className={classes.body} onKeyDown={onKey}>
          {data.length ? (
            rows.map(_renderRow)
          ) : (
            <Placeholder
              padding={padding}
              columns={columns}
              text={placeholderText}
            />
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
                onPageChange={_handlePageChange}
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

      {dropdownItems && dropdownContext && (
        <DropdownMenu
          open={!!menuAnchor}
          context={dropdownContext}
          anchorEl={menuAnchor}
          menuItems={dropdownItems}
          onClose={_handleMenuClose}
        />
      )}
    </TableContainer>
  );
};

export default GrepTable;
