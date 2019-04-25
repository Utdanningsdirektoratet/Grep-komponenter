import * as React from "react";
import { TextField } from "@material-ui/core";
import { BaseTextFieldProps } from "@material-ui/core/TextField/TextField";

export interface GrepInputProps extends BaseTextFieldProps {
    variant?: any;
    errorMessage?: string;
}

const GrepInput: React.FC<GrepInputProps> = props => {
    const { errorMessage, helperText, ...rest } = props;
    return (
        <TextField
            {...rest}
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputLabelProps={{
                shrink: true
            }}
        />
    );
};

export default GrepInput as React.ComponentType<GrepInputProps>;
