import withStyles from "@material-ui/core/styles/withStyles";
import CleanPaper from "../CleanPaper";

export const StyledMainLayout = withStyles({
    root: {
        display: "flex",
        flex: 1,
        flexDirection: "column"
    }
})(CleanPaper);
