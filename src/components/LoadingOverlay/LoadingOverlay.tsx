import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";

const Inner = withStyles({
    root: {
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.5)",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 99
    }
})(CleanPaper);

const LoadingOverlay: React.FC = () => (
    <Inner>
        <CircularProgress />
    </Inner>
);

export default LoadingOverlay as React.ComponentType;
