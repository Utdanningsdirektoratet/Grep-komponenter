import * as React from "react";
import {
    Container,
    StyledTable,
    StyledTableHeader,
    StyledTableRow,
    StyledTableCell,
    StyledTableBody,
    ClickableTableRow,
    StyledPagination
} from "./grepTableStyles";
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

interface LocalState {
    currentPage: number;
    rowsPerPage: number;
    menuOpen: boolean;
    menuAnchor: HTMLElement | null;
    selectedRow: number | null;
}

class GrepTable extends React.Component<IGrepTableProps, LocalState> {
    constructor(props: IGrepTableProps) {
        super(props);
        this.state = {
            currentPage: 0,
            rowsPerPage: props.rowsPerPage || 10,
            menuOpen: false,
            menuAnchor: null,
            selectedRow: null
        };
    }

    public render() {
        const { outlined, header, dropdownItems } = this.props;

        return (
            <Container>
                <StyledTable
                    style={{ borderCollapse: outlined ? "collapse" : "unset" }}
                >
                    {header && this._renderHeader()}
                    {this._renderBody()}
                </StyledTable>
                {this._renderPagination()}
                {dropdownItems && (
                    <DropdownMenu
                        contextId={this.state.selectedRow}
                        menuOpen={this.state.menuOpen}
                        menuItems={dropdownItems}
                        menuAnchor={this.state.menuAnchor}
                        onMenuClose={() =>
                            this.setState({ menuOpen: false, menuAnchor: null })
                        }
                    />
                )}
            </Container>
        );
    }

    private _renderHeader = () => {
        const { columns, dropdownItems } = this.props;

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

    private _renderBody = () => {
        const { data, clickableRows, pagination } = this.props;
        const { currentPage, rowsPerPage } = this.state;

        if (data.length === 0) {
            return this._renderPlaceholder();
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
                        ? this._renderClickableRow(row)
                        : this._renderRow(row, index)
                )}
            </StyledTableBody>
        );
    };

    private _renderRow = (row: ITableData, index: number) => {
        return (
            <StyledTableRow key={index}>
                {this._renderCells(row)}
                {this.props.dropdownItems && this._renderCellButton(row)}
            </StyledTableRow>
        );
    };

    private _renderClickableRow = (row: ITableData) => {
        if (row.rowDisabled) return this._renderRow(row, row.id);

        return (
            <ClickableTableRow
                key={row.id}
                onClick={() => this._handleRowClick(row.id)}
            >
                {this._renderCells(row)}
                {this.props.dropdownItems && this._renderCellButton(row)}
            </ClickableTableRow>
        );
    };

    private _renderCells = (row: ITableData) => {
        const { columns } = this.props;

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

    private _renderCellButton = (row: ITableData) => {
        return (
            <StyledTableCell style={{ width: "5%", padding: 0 }}>
                <IconButton
                    style={{ float: "right" }}
                    onClick={e => this._handleButtonClick(e, row)}
                >
                    <MoreVert />
                </IconButton>
            </StyledTableCell>
        );
    };

    private _handleButtonClick = (
        event: React.MouseEvent<HTMLElement>,
        row: ITableData
    ) => {
        event.stopPropagation();
        this._openDropdown(event, row);
    };

    private _openDropdown = (
        e: React.MouseEvent<HTMLElement>,
        row: ITableData
    ) => {
        const { onContextIdChanged } = this.props;

        this.setState(
            {
                menuAnchor: e.currentTarget,
                menuOpen: true,
                selectedRow: row.id
            },
            () => {
                if (onContextIdChanged) {
                    onContextIdChanged(row.id);
                }
            }
        );
    };

    private _handleRowClick = (id: number) => {
        const { onRowClick } = this.props;
        if (onRowClick) {
            onRowClick(id);
        }
    };

    private _renderPagination = () => {
        const { pagination, data } = this.props;
        const { currentPage, rowsPerPage } = this.state;

        if (pagination) {
            return (
                <StyledPagination
                    component="div"
                    page={currentPage}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    onChangePage={this._handlePageChange}
                    onChangeRowsPerPage={this._handleChangeRowsPerPage}
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

    private _renderPlaceholder = () => {
        const { columns, placeholderText, dropdownItems } = this.props;
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

    private _handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        event && event.preventDefault();
        this.setState({ currentPage: newPage });
    };

    private _handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        this.setState({ rowsPerPage: Number(event.target.value) });
    };
}

export default GrepTable as React.ComponentType<IGrepTableProps>;
