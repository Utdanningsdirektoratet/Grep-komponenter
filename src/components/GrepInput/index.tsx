import * as React from 'react';
import TextField, {
  TextFieldProps,
} from '@mui/material/TextField/TextField';

export type GrepInputProps = TextFieldProps & {
  shrink?: boolean;
  errorMessage?: string;
};

const GrepInput: React.FC<GrepInputProps> = (props) => {
  const { errorMessage, helperText, shrink, value, ...rest } = props;
  const error = errorMessage ? errorMessage.length > 0 : false;

  return (
    <TextField
      {...rest}
      helperText={errorMessage || helperText}
      value={value === null ? '' : value}
      InputLabelProps={{ shrink }}
      error={error || rest.error}
    />
  );
};

export default GrepInput as React.ComponentType<GrepInputProps>;
