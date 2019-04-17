import withStyles from "@material-ui/core/styles/withStyles";
import CleanPaper from "../CleanPaper";

export const StyledBodyLayout = withStyles({
    root: {
        width: "100%",
        paddingTop: 20,
        display: "flex",
        marginBottom: 20,
        justifyContent: "space-between"
    }
})(CleanPaper);
