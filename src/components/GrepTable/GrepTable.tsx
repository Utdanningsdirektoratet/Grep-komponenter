import * as React from "react";
import {
    Container,
    StyledTable,
    StyledTableHeader,
    StyledTableRow,
    StyledTableCell,
    StyledTableBody,
    ClickableTableRow,
    StyledTableFooter,
    StyledPagination
} from "./grepTableStyles";
import {
    PaginationActionsWrapped,
    PaginationActionsProps
} from "./GrepPaginationActions";

export interface ITableColumn<T> {
    label: string;
    width?: number;
    getCell: (row: T) => string | number | JSX.Element;
}

export interface ITableData {
    id: number;
    [key: string]: any;
}

interface Props {
    data: ITableData[];
    columns: Array<ITableColumn<any>>;
    rowsPerPage?: number;
    pagination?: boolean;
    // rowIdPropName?: string;
    clickableRows?: boolean;
    placeholderText?: string;
    onRowClick?: (id: number) => any;
}

interface LocalState {
    currentPage: number;
    rowsPerPage: number;
}

class GrepTable extends React.Component<Props, LocalState> {
    constructor(props: Props) {
        super(props);
        this.state = { currentPage: 0, rowsPerPage: props.rowsPerPage || 10 };
    }

    public render() {
        return (
            <Container>
                <StyledTable>
                    {this._renderHeader()}
                    {this._renderBody()}
                    {this._renderFooter()}
                </StyledTable>
            </Container>
        );
    }

    private _renderHeader = () => {
        const { columns } = this.props;

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
            </StyledTableRow>
        );
    };

    private _renderClickableRow = (row: ITableData) => {
        // const { rowIdPropName } = this.props;
        // const rowId = rowIdPropName ? row[rowIdPropName] : row.id;

        return (
            <ClickableTableRow
                key={row.id}
                onClick={() => this._handleRowClick(row.id)}
            >
                {this._renderCells(row)}
            </ClickableTableRow>
        );
    };

    private _handleRowClick = (id: number) => {
        const { onRowClick } = this.props;
        if (onRowClick) {
            onRowClick(id);
        }
    };

    private _renderCells = (row: ITableData) => {
        const { columns } = this.props;

        return columns.map((col, index) => (
            <StyledTableCell key={index} style={{ width: `${col.width}%` }}>
                {col.getCell(row)}
            </StyledTableCell>
        ));
    };

    private _renderFooter = () => {
        const { pagination, data } = this.props;
        const { currentPage, rowsPerPage } = this.state;

        if (pagination) {
            return (
                <StyledTableFooter>
                    <StyledTableRow>
                        <StyledPagination
                            count={data.length}
                            page={currentPage}
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
                    </StyledTableRow>
                </StyledTableFooter>
            );
        } else {
            return;
        }
    };

    private _renderPlaceholder = () => {
        const { columns, placeholderText } = this.props;
        const columnCount = columns.length;

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

export default GrepTable as React.ComponentType<Props>;
