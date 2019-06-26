import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

export const Container = withStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    }
})(CleanPaper);

const whiteSpaceStyle = ({ breakpoints }: Theme) =>
    createStyles({
        root: {
            [breakpoints.down(1140)]: {
                display: "none"
            }
        }
    });

export const WhiteSpace = withStyles(whiteSpaceStyle)(CleanPaper);
