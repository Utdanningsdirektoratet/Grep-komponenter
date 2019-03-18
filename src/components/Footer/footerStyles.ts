import withStyles from "@material-ui/core/styles/withStyles";
import CleanPaper from "../CleanPaper";
import withTheme from "@material-ui/core/styles/withTheme";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = ({ palette }: Theme) =>
    createStyles({
        root: {
            bottom: 0,
            height: 50,
            width: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            backgroundColor: palette.primary.main
        }
    });

export const StyledFooter = withTheme()(withStyles(styles)(CleanPaper));
