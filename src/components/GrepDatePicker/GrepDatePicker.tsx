import * as React from "react";
import TextField, {
    TextFieldProps
} from "@material-ui/core/TextField/TextField";
import Event from "@material-ui/icons/Event";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

export type GrepDatePickerProps = TextFieldProps & {
    errorMessage?: string;
};

const GrepDatePicker: React.FC<GrepDatePickerProps> = props => {
    const { errorMessage, helperText, ...rest } = props;
    const error = errorMessage ? errorMessage.length > 0 : false;

    return (
        <TextField
            {...rest}
            type="date"
            error={error}
            helperText={errorMessage || helperText}
            InputLabelProps={{ shrink: true }}
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
