import * as React from "react";
import {
    Container,
    StyledTable,
    StyledTableHeader,
    StyledTableRow,
    StyledTableCell,
    StyledTableBody,
    ClickableTableRow,
    paginationStyles
} from "./grepTableStyles";
import {
    PaginationActionsWrapped,
    PaginationActionsProps
} from "./GrepPaginationActions";
import DropdownMenu, { IMenuItem } from "../DropdownMenu";
import MoreVert from "@material-ui/icons/MoreVert";
import OverflowTooltip from "../OverflowTooltip";
import {
    IconButton,
    TablePagination,
    Tooltip,
    TableSortLabel
} from "@material-ui/core";

export interface ITableColumn<T> {
    label: string;
    width?: number;
    colDef?: string;
    sortable?: boolean;
    forceTooltip?: boolean;
    getTooltip?: (row: T) => string;
    getCell: (row: T) => string | number | boolean | JSX.Element;
}

export interface ITableData {
    id: number | string;
    rowDisabled?: boolean;
}

export interface IGrepTableProps<T extends ITableData> {
    data: T[];
    columns: Array<ITableColumn<T>>;
    sortBy?: string;
    header?: boolean;
    outlined?: boolean;
    rowHeight?: number;
    rowsPerPage?: number;
    pagination?: boolean;
    clickableRows?: boolean;
    placeholderText?: string;
    dropdownItems?: IMenuItem[];
    style?: React.CSSProperties;
    sortDirection?: "desc" | "asc";
    onRowClick?: (row: T) => any;
    menuTooltip?: (row: T) => string;
    menuDisabled?: (row: T) => boolean;
    onContextIdChanged?: (row: T) => void;
    onSortBy?: (col: ITableColumn<T>) => any;
}

export default <T extends ITableData>({
    placeholderText,
    dropdownItems,
    clickableRows,
    pagination,
    rowHeight,
    outlined,
    columns,
    header,
    data,
    ...props
}: IGrepTableProps<T>) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(
        props.rowsPerPage || 10
    );
    const [selectedRow, setSelectedRow] = React.useState<
        number | string | null
    >(null);
    const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(
        null
    );

    const _renderHeader = () => (
        <StyledTableHeader>
            <StyledTableRow style={{ height: rowHeight ? rowHeight : 50 }}>
                {columns.map((col, columnIndex) => (
                    <StyledTableCell
                        key={columnIndex}
                        style={{ width: `${col.width}%` }}
                    >
                        {props.onSortBy && col.sortable
                            ? _renderSortLabel(col)
                            : col.label}
                    </StyledTableCell>
                ))}
                {dropdownItems && <StyledTableCell style={{ width: "5%" }} />}
            </StyledTableRow>
        </StyledTableHeader>
    );

    const _renderSortLabel = (col: ITableColumn<any>) => (
        <TableSortLabel
            direction={props.sortDirection}
            active={props.sortBy === col.colDef}
            onClick={() => props.onSortBy!(col)}
        >
            {col.label}
        </TableSortLabel>
    );

    const _renderBody = () => {
        if (data.length === 0) {
            return _renderPlaceholder();
        }

        let rows: T[] = data;

        if (pagination) {
            rows = data.slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
            );
        }

        return (
            <StyledTableBody>
                {rows.map((row, index) =>
                    clickableRows
                        ? _renderClickableRow(row)
                        : _renderRow(row, index)
                )}
            </StyledTableBody>
        );
    };

    const _renderRow = (row: T, index: number | string) => (
        <StyledTableRow
            key={index}
            style={{ height: rowHeight ? rowHeight : 50 }}
        >
            {_renderCells(row)}
            {dropdownItems && _renderCellButton(row)}
        </StyledTableRow>
    );

    const _renderClickableRow = (row: T) => {
        if (row.rowDisabled) return _renderRow(row, row.id);

        return (
            <ClickableTableRow
                key={row.id}
                style={{ height: rowHeight ? rowHeight : 50 }}
                onClick={() => _handleRowClick(row)}
            >
                {_renderCells(row)}
                {dropdownItems && _renderCellButton(row)}
            </ClickableTableRow>
        );
    };

    const _renderCells = (row: T) =>
        columns.map((col, index) => {
            const { forceTooltip, getTooltip, getCell } = col;

            if (forceTooltip || getTooltip) {
                return (
                    <StyledTableCell
                        key={index}
                        style={{ width: `${col.width}%` }}
                    >
                        <OverflowTooltip
                            force={forceTooltip}
                            title={getTooltip ? getTooltip(row) : getCell(row)}
                        >
                            {getCell(row)}
                        </OverflowTooltip>
                    </StyledTableCell>
                );
            } else {
                return (
                    <StyledTableCell
                        key={index}
                        style={{ width: `${col.width}%` }}
                    >
                        {col.getCell(row)}
                    </StyledTableCell>
                );
            }
        });

    const _renderCellButton = (row: T) => {
        const { menuDisabled, menuTooltip } = props;
        const disabled = menuDisabled && menuDisabled(row);
        const tooltip = menuTooltip ? menuTooltip(row) : "";

        return (
            <Tooltip title={tooltip}>
                <StyledTableCell style={{ width: "5%", padding: 0 }}>
                    <IconButton
                        disabled={disabled}
                        style={{ float: "right" }}
                        onClick={e => _handleButtonClick(e, row)}
                    >
                        <MoreVert />
                    </IconButton>
                </StyledTableCell>
            </Tooltip>
        );
    };

    const _handleButtonClick = (
        event: React.MouseEvent<HTMLElement>,
        row: T
    ) => {
        event.stopPropagation();
        _openDropdown(event, row);
    };

    const _openDropdown = (e: React.MouseEvent<HTMLElement>, row: T) => {
        const { onContextIdChanged } = props;
        setMenuAnchor(e.currentTarget);
        setMenuOpen(true);
        setSelectedRow(row.id);
        if (onContextIdChanged) {
            onContextIdChanged(row);
        }
    };

    const _handleRowClick = (row: T) => {
        const { onRowClick } = props;
        if (onRowClick) {
            onRowClick(row);
        }
    };

    const classes = paginationStyles();

    const _renderPagination = () =>
        pagination && (
            <TablePagination
                classes={{ ...classes }}
                component="div"
                page={currentPage}
                count={data.length}
                rowsPerPage={rowsPerPage}
                onChangePage={_handlePageChange}
                onChangeRowsPerPage={_handleChangeRowsPerPage}
                labelRowsPerPage={""}
                labelDisplayedRows={({ from, to, count }) =>
                    `Viser ${from}-${to} av ${count}`
                }
                ActionsComponent={props => (
                    <PaginationActionsWrapped
                        {...(props as PaginationActionsProps)}
                    />
                )}
            />
        );

    const columnCount = columns.length + (dropdownItems ? 1 : 0);

    const _renderPlaceholder = () => (
        <StyledTableBody>
            <StyledTableRow style={{ height: rowHeight ? rowHeight : 50 }}>
                <StyledTableCell colSpan={columnCount}>
                    {placeholderText ? placeholderText : "Tabellen er tom."}
                </StyledTableCell>
            </StyledTableRow>
        </StyledTableBody>
    );

    const _handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        event && event.preventDefault();
        setCurrentPage(newPage);
    };

    const _handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setRowsPerPage(Number(event.target.value));
    };

    const _handleMenuClose = () => {
        setMenuOpen(false);
        setMenuAnchor(null);
    };

    return (
        <Container style={props.style}>
            <StyledTable
                style={{ borderCollapse: outlined ? "collapse" : "unset" }}
            >
                {header && _renderHeader()}
                {_renderBody()}
            </StyledTable>
            {_renderPagination()}
            {dropdownItems && (
                <DropdownMenu
                    contextId={selectedRow}
                    menuOpen={menuOpen}
                    menuItems={dropdownItems}
                    menuAnchor={menuAnchor}
                    onMenuClose={_handleMenuClose}
                />
            )}
        </Container>
    );
};
