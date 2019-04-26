import * as React from "react";
import TextField, {
    BaseTextFieldProps
} from "@material-ui/core/TextField/TextField";
import Event from "@material-ui/icons/Event";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

export interface GrepDatePickerProps extends BaseTextFieldProps {
    outlined?: boolean;
    errorMessage?: string;
}

const Adornment: React.FC<{}> = () => (
    <InputAdornment position="end">
        <Event />
    </InputAdornment>
);

const GrepDatePicker: React.FC<GrepDatePickerProps> = props => {
    const { errorMessage, helperText, outlined, ...rest } = props;

    return outlined ? (
        <TextField
            {...rest}
            type="date"
            variant="outlined"
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputProps={{ endAdornment: <Adornment /> }}
            InputLabelProps={{ shrink: true }}
        />
    ) : (
        <TextField
            {...rest}
            type="date"
            variant="standard"
            helperText={errorMessage || helperText}
            error={typeof errorMessage !== "undefined"}
            InputProps={{ endAdornment: <Adornment /> }}
            InputLabelProps={{ shrink: true }}
        />
    );
};

export default GrepDatePicker as React.ComponentType<GrepDatePickerProps>;
