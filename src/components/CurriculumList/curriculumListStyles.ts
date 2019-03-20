import { Colors } from "../../styling";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

export const Container = withStyles({
    root: {
        border: "1px solid lightgrey",
        height: "fit-content",
        width: "48%"
    }
})(CleanPaper);

export const Title = withStyles({
    root: {
        fontSize: 24,
        padding: 20,
        color: Colors.black
    }
})(Typography);

export const StyledList = withStyles({
    root: {
        padding: 0
    }
})(List);

export const StyledParentList = withStyles({
    root: {
        display: "block",
        padding: 0
    }
})(ListItem);

export const StyledListItem = withStyles({})(ListItem);

export const StyledListIcon = withStyles({
    root: {
        marginRight: 0
    }
})(ListItemIcon);
