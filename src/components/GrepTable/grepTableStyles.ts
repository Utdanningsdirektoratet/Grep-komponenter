import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import createStyles from "@material-ui/core/styles/createStyles";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Button from "@material-ui/core/Button/Button";
import CleanPaper from "../CleanPaper";
import Colors from "../../styling/Colors";
import withTheme from "@material-ui/core/styles/withTheme";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const Container = withStyles({
    root: {}
})(CleanPaper);

export const StyledTable = withStyles({})(Table);

export const StyledTableBody = withStyles({
    root: {}
})(TableBody);

const tableRowStyles = createStyles({
    root: {
        height: 50,
        border: `1px solid ${Colors.lightGrey}`,
        whiteSpace: "nowrap"
    }
});

export const StyledTableHeader = withStyles({
    root: {
        ...tableRowStyles.root
    }
})(TableHead);

export const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export const ClickableTableRow = withStyles({
    root: {
        ...tableRowStyles.root,
        cursor: "pointer",

        "&:hover": {
            background: `${Colors.hoverGrey}`
        }
    }
})(TableRow);

export const StyledTableCell = withStyles({
    root: {
        padding: "10px 20px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: 14
    }
})(TableCell);

export const StyledTableFooter = withStyles({})(TableFooter);

export const StyledPagination = withStyles({
    toolbar: {
        padding: 0,
        width: "100%",
        display: "grid",
        gridTemplateAreas: "'left right'"
    },
    input: {
        gridArea: "left",
        justifySelf: "start"
    },
    caption: {
        gridArea: "left",
        paddingLeft: "60px"
    },
    spacer: {
        display: "none"
    }
})(TablePagination);

export const PaginationTextButton = withStyles({
    root: {
        textTransform: "capitalize",
        fontWeight: "initial",
        fontSize: 12
    }
})(Button);

const buttonStyles = ({ palette }: Theme) =>
    createStyles({
        root: {
            minWidth: "18px",
            minHeight: "20px",
            padding: "0 6px",
            margin: "0 8px",
            borderRadius: "2px",
            fontSize: 12,
            backgroundColor: palette.primary.main
        }
    });

export const PaginationButton = withTheme()(withStyles(buttonStyles)(Button));
