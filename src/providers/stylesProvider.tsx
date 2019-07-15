import * as React from "react";
import { StylesProvider as MuiStylesProvider } from "@material-ui/styles";

const StylesProvider: React.FC<{}> = ({ children }) => {
    return <MuiStylesProvider injectFirst>{children}</MuiStylesProvider>;
};

export default StylesProvider;
