import CleanPaper from "../CleanPaper";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const ContainerStyles = ({ palette }: Theme) =>
    createStyles({
        root: {
            width: "fit-content",
            minWidth: 150,
            display: "flex",
            flexDirection: "column",
            background: palette.primary.main,
            borderTop: "1px solid white"
        }
    });

export const Container = withStyles(ContainerStyles)(CleanPaper);

const ButtonStyles = ({ palette }: Theme) =>
    createStyles({
        root: {
            margin: 10,
            background: "white",
            borderRadius: 2,
            color: palette.primary.main
        },
        label: {
            justifyContent: "unset"
        }
    });

export const BackButton = withStyles(ButtonStyles)(Button);

export const StyledBackIcon = withStyles({
    root: {
        fontSize: 18,
        position: "absolute"
    }
})(ArrowBack);

export const StyledButtonText = withStyles({
    root: {
        textTransform: "capitalize",
        background: "transparent",
        fontSize: 14,
        margin: "auto"
    }
})(CleanPaper);

export const StyledListText = withStyles({
    primary: {
        color: "white",
        fontWeight: 500,
        fontSize: 14
    }
})(ListItemText);
