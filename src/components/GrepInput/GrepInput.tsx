import * as React from "react";
import TextField, {
    BaseTextFieldProps
} from "@material-ui/core/TextField/TextField";

export interface GrepInputProps extends BaseTextFieldProps {
    outlined?: boolean;
    errorMessage?: string;
}

const GrepInput: React.FC<GrepInputProps> = props => {
    const { errorMessage, helperText, outlined, ...rest } = props;

    return outlined ? (
        <TextField
            {...rest}
            variant="outlined"
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputLabelProps={{ shrink: true }}
        />
    ) : (
        <TextField
            {...rest}
            variant="standard"
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputLabelProps={{ shrink: true }}
        />
    );
};

export default GrepInput as React.ComponentType<GrepInputProps>;
