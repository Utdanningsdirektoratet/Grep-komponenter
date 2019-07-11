import { Colors } from "../../styling";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withTheme from "@material-ui/core/styles/withTheme";
import ArrowForward from "@material-ui/icons/ArrowForward";

export const Container = withStyles({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    }
})(CleanPaper);

export const Title = withStyles({
    root: {
        fontSize: 24,
        color: Colors.black,
        marginBottom: 30
    }
})(Typography);

export const PageLink = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        borderBottom: `1px solid ${Colors.lightGrey}`
    }
})(CleanPaper);

const linkStyles = ({ palette }: Theme) =>
    createStyles({
        root: {
            fontSize: "18px",
            color: palette.primary.main,
            textDecoration: "none",
            margin: "14px 0"
        }
    });

const iconStyles = ({ palette }: Theme) =>
    createStyles({
        root: {
            color: palette.primary.main
        }
    });

export const StyledLink = withTheme(withStyles(linkStyles)(CleanPaper));

export const StyledArrow = withTheme(withStyles(iconStyles)(ArrowForward));
