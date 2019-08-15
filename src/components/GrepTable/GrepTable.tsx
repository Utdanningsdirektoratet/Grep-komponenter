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
    id: number;
    rowDisabled?: boolean;
    [key: string]: any;
}

export interface IGrepTableProps {
    data: ITableData[];
    columns: Array<ITableColumn<any>>;
    sortBy?: string;
    header?: boolean;
    outlined?: boolean;
    rowsPerPage?: number;
    pagination?: boolean;
    clickableRows?: boolean;
    placeholderText?: string;
    dropdownItems?: IMenuItem[];
    sortDirection?: "desc" | "asc";
    onRowClick?: (id: number) => any;
    menuTooltip?: (row: any) => string;
    menuDisabled?: (row: any) => boolean; // TODO: Remove any type from row-parameter
    onContextIdChanged?: (row: any) => void;
    onSortBy?: (col: ITableColumn<any>) => any;
}

const GrepTable: React.FC<IGrepTableProps> = props => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(
        props.rowsPerPage || 10
    );
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(
        null
    );
    const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
    const {
        outlined,
        header,
        dropdownItems,
        data,
        clickableRows,
        pagination,
        columns
    } = props;

    const _renderHeader = () => (
        <StyledTableHeader>
            <StyledTableRow>
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

        let rows: ITableData[] = data;

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

    const _renderRow = (row: ITableData, index: number) => (
        <StyledTableRow key={index}>
            {_renderCells(row)}
            {dropdownItems && _renderCellButton(row)}
        </StyledTableRow>
    );

    const _renderClickableRow = (row: ITableData) => {
        if (row.rowDisabled) return _renderRow(row, row.id);

        return (
            <ClickableTableRow
                key={row.id}
                onClick={() => _handleRowClick(row.id)}
            >
                {_renderCells(row)}
                {dropdownItems && _renderCellButton(row)}
            </ClickableTableRow>
        );
    };

    const _renderCells = (row: ITableData) => {
        const { columns } = props;

        return columns.map((col, index) => {
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
    };

    const _renderCellButton = (row: ITableData) => {
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
        row: ITableData
    ) => {
        event.stopPropagation();
        _openDropdown(event, row);
    };

    const _openDropdown = (
        e: React.MouseEvent<HTMLElement>,
        row: ITableData
    ) => {
        const { onContextIdChanged } = props;
        setMenuAnchor(e.currentTarget);
        setMenuOpen(true);
        setSelectedRow(row.id);
        if (onContextIdChanged) {
            onContextIdChanged(row);
        }
    };

    const _handleRowClick = (id: number) => {
        const { onRowClick } = props;
        if (onRowClick) {
            onRowClick(id);
        }
    };

    const _renderPagination = () => {
        const { pagination, data } = props;
        const classes = paginationStyles();

        if (pagination) {
            return (
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
                            {...props as PaginationActionsProps}
                        />
                    )}
                />
            );
        } else {
            return;
        }
    };

    const _renderPlaceholder = () => {
        const { columns, placeholderText, dropdownItems } = props;
        const columnCount = columns.length + (dropdownItems ? 1 : 0);

        return (
            <StyledTableBody>
                <StyledTableRow>
                    <StyledTableCell colSpan={columnCount}>
                        {placeholderText ? placeholderText : "Tabellen er tom."}
                    </StyledTableCell>
                </StyledTableRow>
            </StyledTableBody>
        );
    };

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
        <Container>
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

export default GrepTable as React.ComponentType<IGrepTableProps>;
