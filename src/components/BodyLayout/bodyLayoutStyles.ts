import withStyles from "@material-ui/core/styles/withStyles";
import CleanPaper from "../CleanPaper";

export const StyledBodyLayout = withStyles({
    root: {
        width: "100%",
        paddingTop: 20,
        display: "flex",
        justifyContent: "space-between"
    }
})(CleanPaper);
