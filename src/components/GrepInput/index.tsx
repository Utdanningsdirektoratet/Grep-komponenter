import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type GrepInputProps = TextFieldProps & {
  shrink?: boolean;
  errorMessage?: string;
};

const GrepInput: React.FC<GrepInputProps> = ({
  variant = 'standard',
  ...props
}) => {
  const { errorMessage, helperText, shrink, value, ...rest } = props;
  const error = errorMessage ? errorMessage.length > 0 : false;

  return (
    <TextField
      {...rest}
      variant={variant}
      helperText={errorMessage || helperText}
      value={value === null ? '' : value}
      InputLabelProps={{ shrink }}
      error={error || rest.error}
    />
  );
};

export default GrepInput as React.ComponentType<GrepInputProps>;
