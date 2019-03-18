import styled from "styled-components";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

export const AppLogo = styled.img`
    height: 50px;
    width: 50px;
`;

export const AppTitle = withStyles({
    root: {
        margin: "0 20px",
        fontSize: 22
    }
})(Typography);

export const AppEnvironment = withStyles({
    root: {
        textTransform: "uppercase",
        color: "rgba(0, 0, 0, 0.33)",
        fontSize: 22
    }
})(Typography);

export const AppBarContainer = withStyles({
    root: {
        display: "flex",
        padding: "15px 10px",
        width: "fit-content",
        alignItems: "center",
        float: "left"
    }
})(CleanPaper);
