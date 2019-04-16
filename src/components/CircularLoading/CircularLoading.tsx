import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CleanPaper from "../CleanPaper";
import withStyles from "@material-ui/core/styles/withStyles";

const Inner = withStyles({
    root: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})(CleanPaper);

interface Props {
    height?: number;
}

const CircularLoading: React.FC<Props> = props => (
    <Inner style={{ height: props.height }}>
        <CircularProgress />
    </Inner>
);

export default CircularLoading as React.ComponentType<Props>;
