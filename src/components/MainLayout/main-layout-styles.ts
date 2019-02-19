import { withStyles } from "@material-ui/core";
import MUiPaper from "@material-ui/core/Paper";

export const StyledMainLayout = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%"
  }
})(MUiPaper);
