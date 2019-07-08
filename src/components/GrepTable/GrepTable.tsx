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
import TablePagination from "@material-ui/core/TablePagination";
import {
    PaginationActionsWrapped,
    PaginationActionsProps
} from "./GrepPaginationActions";
import DropdownMenu, { IMenuItem } from "../DropdownMenu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import OverflowTooltip from "../OverflowTooltip";

export interface ITableColumn<T> {
    label: string;
    width?: number;
    colDef?: string;
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
    header?: boolean;
    outlined?: boolean;
    rowsPerPage?: number;
    pagination?: boolean;
    dropdownItems?: IMenuItem[];
    clickableRows?: boolean;
    placeholderText?: string;
    onRowClick?: (id: number) => any;
    onContextIdChanged?: (id: number) => void;
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
    const [selectedRow, setSelectedRow] = React.useState(null);
    const {
        outlined,
        header,
        dropdownItems,
        data,
        clickableRows,
        pagination,
        columns
    } = props;

    const _renderHeader = () => {
        return (
            <StyledTableHeader>
                <StyledTableRow>
                    {columns.map((col, columnIndex) => (
                        <StyledTableCell
                            key={columnIndex}
                            style={{ width: `${col.width}%` }}
                        >
                            {col.label}
                        </StyledTableCell>
                    ))}
                    {dropdownItems && (
                        <StyledTableCell style={{ width: "5%" }} />
                    )}
                </StyledTableRow>
            </StyledTableHeader>
        );
    };

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

    const _renderRow = (row: ITableData, index: number) => {
        return (
            <StyledTableRow key={index}>
                {_renderCells(row)}
                {dropdownItems && _renderCellButton(row)}
            </StyledTableRow>
        );
    };

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
        return (
            <StyledTableCell style={{ width: "5%", padding: 0 }}>
                <IconButton
                    style={{ float: "right" }}
                    onClick={e => _handleButtonClick(e, row)}
                >
                    <MoreVert />
                </IconButton>
            </StyledTableCell>
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
            onContextIdChanged(row.id);
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
