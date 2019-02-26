import withStyles from "@material-ui/core/styles/withStyles";
import MUiPaper from "@material-ui/core/Paper";

export const StyledBodyLayout = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%"
  }
})(MUiPaper);
