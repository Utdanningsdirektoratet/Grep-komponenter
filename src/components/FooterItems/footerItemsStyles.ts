import { makeStyles, createStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import MUiList from "@material-ui/core/List";
import MUiListItemText from "@material-ui/core/ListItemText";
import Colors from "../../styling/Colors";

export const listItemStyles = makeStyles(
    createStyles({
        root: {
            color: Colors.white,
            borderRight: "1px solid",
            width: "fit-content",
            height: "10px",

            "&:last-child": {
                border: "0 !important"
            }
        },
        button: {
            "&:hover, &:focus": {
                backgroundColor: "unset"
            }
        }
    })
);

export const StyledFooter = withStyles({
    root: {
        display: "flex"
    }
})(MUiList);

export const StyledFooterItemText = withStyles({
    root: { padding: 0, margin: "0 20px" },
    primary: {
        color: "inherit",
        textAlign: "center",
        fontSize: 16
    }
})(MUiListItemText);
