import withStyles from "@material-ui/core/styles/withStyles";
import MUiList from "@material-ui/core/List";
import MUiListItem from "@material-ui/core/ListItem";
import MUiListItemText from "@material-ui/core/ListItemText";
import Colors from "../../styling/Colors";

export const StyledList = withStyles({
    root: {
        display: "inline-flex",
        width: "unset",
        height: 40
    },
    padding: {
        padding: 0
    }
})(MUiList);

export const StyledListItem = withStyles({
    root: {
        textAlign: "center",
        width: "unset",
        borderLeft: `1px solid ${Colors.white}`,
        "&:last-child": {
            borderRight: `1px solid ${Colors.white}`
        }
    },
    selected: {
        backgroundColor: "unset !important",
        boxShadow: `0 -2px 0 ${Colors.red} inset`
    }
})(MUiListItem);

export const StyledListItemText = withStyles({
    root: {
        paddingRight: 0
    },
    primary: {
        color: Colors.white,
        textTransform: "uppercase"
    }
})(MUiListItemText);
