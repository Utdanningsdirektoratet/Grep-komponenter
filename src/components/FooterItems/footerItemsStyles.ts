import withStyles from "@material-ui/core/styles/withStyles";
import MUiList from "@material-ui/core/List";
import MUiListItem from "@material-ui/core/ListItem";
import MUiListItemText from "@material-ui/core/ListItemText";
import { Colors } from "../..";

export const StyledFooter = withStyles({
    root: {
        display: "flex"
    }
})(MUiList);

export const StyledFooterItem = withStyles({
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
})(MUiListItem);

export const StyledFooterItemText = withStyles({
    root: { padding: 0, margin: "0 20px" },
    primary: {
        color: "inherit",
        textAlign: "center",
        fontSize: 16
    }
})(MUiListItemText);
