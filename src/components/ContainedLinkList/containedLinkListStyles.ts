import { Colors } from "../../styling";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";

export const Container = withStyles({
    root: {
        border: `1px solid ${Colors.lightGrey}`,
        height: "fit-content",
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

export const StyledListItem = withStyles({})(ListItem);
