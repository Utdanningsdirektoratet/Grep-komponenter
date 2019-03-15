import * as React from "react";
import { CleanedPaper } from "./cleanPaperStyles";

export interface CleanPaperProps {
    classes: {
        root: string;
    };
}

const CleanPaper: React.FC<CleanPaperProps> = props => (
    <CleanedPaper elevation={0} square className={props.classes.root}>
        {props.children}
    </CleanedPaper>
);

export default CleanPaper as React.ComponentType<CleanPaperProps>;
