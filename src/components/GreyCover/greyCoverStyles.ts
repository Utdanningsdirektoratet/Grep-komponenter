import withStyles from "@material-ui/core/styles/withStyles";
import CleanPaper from "../CleanPaper";

export const StyledGreyCover = withStyles({
    root: {
        background: "#f1f1f1",
        marginBottom: 12,
        padding: "10px 0"
    }
})(CleanPaper);
