import { withStyles } from "@material-ui/core";
import MUiPaper from "@material-ui/core/Paper";

export const StyledCenterLayout = withStyles({
  root: {
    display: "flex",
    maxWidth: 1028,
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    width: "100%"
  }
})(MUiPaper);
