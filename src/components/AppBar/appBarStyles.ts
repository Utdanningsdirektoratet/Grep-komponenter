import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";

export const StyledAppBar = withStyles({
    root: {
        backgroundColor: "transparant",
        display: "flex",
        flexDirection: "row"
    }
})(AppBar);
