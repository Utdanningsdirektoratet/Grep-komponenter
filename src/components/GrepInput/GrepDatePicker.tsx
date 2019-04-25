import * as React from "react";
import TextField, {
    BaseTextFieldProps
} from "@material-ui/core/TextField/TextField";
import Event from "@material-ui/icons/Event";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

export interface GrepDatePickerProps extends BaseTextFieldProps {
    variant?: any;
    errorMessage?: string;
}

const GrepDatePicker: React.FC<GrepDatePickerProps> = props => {
    const { errorMessage, helperText, ...rest } = props;
    return (
        <TextField
            {...rest}
            type="date"
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Event />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default GrepDatePicker as React.ComponentType<GrepDatePickerProps>;
