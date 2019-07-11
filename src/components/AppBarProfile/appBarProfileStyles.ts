import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

export const Container = withStyles({
    root: {
        display: "flex",
        padding: "16px 8px",
        width: "fit-content",
        height: "fit-content",
        alignItems: "center",
        float: "right"
    }
})(CleanPaper);

export const UserContainer = withStyles({
    root: {
        margin: "0 10px",
        marginLeft: 20,
        height: "fit-content"
    }
})(CleanPaper);

export const UserName = withStyles({
    root: {
        fontSize: 16
    }
})(Typography);

export const UserRole = withStyles({
    root: {
        fontSize: 12
    }
})(Typography);
