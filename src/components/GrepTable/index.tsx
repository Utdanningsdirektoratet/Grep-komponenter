import React, { useCallback } from 'react';
import { Key } from 'ts-keycode-enum';

import MoreVert from '@mui/icons-material/MoreVert';
import {
  Table,
  TableRow,
  TableBody,
  TableFooter,
  TableContainer,
  TableCellProps,
  TableProps,
  Tooltip,
  IconButton,
} from '@mui/material';

import GrepTableRow from './components/grep-table-row';
import GrpeTableHeader from './components/grep-table-header';
import GrepTablePagination from './components/grep-table-pagination';
import Placeholder from './components/grep-table-placeholder';
import DropdownMenu, { DropdownMenuItem } from '../DropdownMenu';
import { makeStyles } from '../../styling';

export interface TableColumn<T> extends Pick<TableCellProps, 'padding' | 'sx'> {
  label?: string | JSX.Element;
  width?: number | string;
  colDef?: string;
  sortable?: boolean;
  forceTooltip?: boolean;
  getTooltip?: (row: T) => string;
  getCell: (row: T) => string | number | boolean | JSX.Element;
  lines?: (row: T) => number;
  lang?: string | ((row: T) => string);
}

export interface GrepTableProps<T>
  extends Pick<TableProps, 'size' | 'stickyHeader' | 'padding'> {
  data: T[];
  columns: Array<TableColumn<T>>;
  sortBy?: string;
  header?: boolean;
  outlined?: boolean;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
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
  menuButtonLabel?: string;
  /**
   * @deprecated No longer in use.
   */
  rowHeight?: number;
  disableSelectOnClick?: boolean;
  underlineOnFocus?: boolean;
  rowTabIndex?: number;
}

interface StyleProps {
  outlined?: boolean;
  showHeader?: boolean;
}

export const useStyles = makeStyles<StyleProps>()(
  (theme, { showHeader, outlined }) => ({
    table: {
      border: outlined ? `1px solid ${theme.palette.divider}` : 'none',
      borderCollapse: outlined ? 'separate' : 'collapse',
      tableLayout: 'auto',
    },
    header: {
      visibility: showHeader ? 'visible' : 'collapse',
    },
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
  disableSelectOnClick = false,
  menuButtonLabel,
  underlineOnFocus,
  rowTabIndex,
  rowsPerPageOptions = [5, 10, 25, 50],
  ...props
}: GrepTableProps<T>) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 10);
  const [menuAnchor, setMenuAnchor] = React.useState<Element | null>(null);
  const [currentPage, _setCurrentPage] = React.useState<number>(0);
  const [selectedRowIndex, _setSelectedRowIndex] = React.useState<number>();
  const [expandedRowIndex, _setExpandedRowIndex] = React.useState<number>();
  const [dropdownContext, setDropdownContext] = React.useState<T>();

  const selectedRow = data[selectedRowIndex!] || null;

  const setCurrentPage = useCallback(
    (index: number, rowIndex?: number, shouldExpand?: boolean) => {
      index = pagination && index >= 0 ? index : 0;
      _setCurrentPage(index);
      _setSelectedRowIndex(rowIndex);
      if (shouldExpand) {
        _setExpandedRowIndex(rowIndex);
      }
    },
    [
      _setCurrentPage,
      _setSelectedRowIndex,
      _setExpandedRowIndex,
      rowsPerPage,
      pagination,
    ],
  );

  const setSelectedRowIndex = (index: number, shouldExpand = true) => {
    const hasIndexChanged = index === selectedRowIndex;
    const pageIndex = Math.floor(index / rowsPerPage);
    setCurrentPage(pageIndex, index, shouldExpand);
    if (hasIndexChanged && onSelectedRowChange) {
      onSelectedRowChange(data[index]);
    }
  };

  const setSelectedElement = (el: Element, shouldExpand = true) => {
    setSelectedRowIndex(getElementIndex(el), shouldExpand);
  };

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
            size="large"
            aria-label={menuButtonLabel ?? 'Åpne meny'}
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
        tabIndex={rowTabIndex ?? 0}
        hover={clickableRows}
        selected={rowIndex === selectedRowIndex}
        expanded={rowIndex === expandedRowIndex}
        clickable={clickableRows}
        onMouseDown={(e: any) => {
          if (e.target.type === 'checkbox') {
            e.preventDefault();
            e.stopPropagation();
            setSelectedElement(e.currentTarget, false);
          } else {
            setSelectedElement(e.currentTarget);
            if (!disableSelectOnClick) {
              _handleRowClick(row);
            }
          }
        }}
        columns={rowColumns}
        row={row}
        style={{ cursor: clickableRows && !disabled ? 'pointer' : '' }}
        onFocus={(e) => {
          if (selectedRowIndex !== rowIndex) {
            setSelectedElement(e.currentTarget);
          }
        }}
        underlineOnFocus={underlineOnFocus}
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

  const { classes } = useStyles({ outlined, showHeader: header });

  return (
    <TableContainer sx={props.style}>
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
                onPageChange={_handlePageChange}
                rowsPerPageOptions={rowsPerPageOptions}
                onRowsPerPageChange={_handleChangeRowsPerPage}
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

export { GrepTableRow };

export default GrepTable;
