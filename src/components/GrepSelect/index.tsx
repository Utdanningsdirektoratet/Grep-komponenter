import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import { Input, FormHelperText } from '@mui/material';

export interface SelectItem {
  value: string | number;
  label?: string;
  disabled?: boolean;
}
export interface GrepSelectProps extends SelectProps {
  label: string;
  outlined?: boolean;
  helperText?: string;
  errorMessage?: string;
  selectItems: SelectItem[];
  formMargin?: 'none' | 'dense' | 'normal';
}

const GrepSelect: React.FC<GrepSelectProps> = (props) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const {
    errorMessage,
    selectItems,
    helperText,
    formMargin,
    fullWidth,
    outlined,
    disabled,
    required,
    label,
    value,
    id,
    ...rest
  } = props;

  const error = errorMessage ? errorMessage.length > 0 : false;

  return (
    <FormControl
      variant={outlined ? 'outlined' : 'standard'}
      margin={formMargin ? formMargin : 'normal'}
      className={props.className}
      fullWidth={fullWidth}
      required={required}
      style={props.style}
      error={error}
      disabled={disabled}
    >
      <InputLabel
        htmlFor={id}
        ref={inputLabel}
        style={{ width: 'max-content' }}
      >
        {label}
      </InputLabel>
      <Select
        {...rest}
        inputProps={{ id }}
        disabled={!selectItems || disabled}
        value={value === null ? '' : value}
        style={{ minWidth: labelWidth + (outlined ? 35 : 25) }}
        // @todo: make input respect label length
        input={outlined ? <OutlinedInput label={label} /> : <Input />}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }}
      >
        <MenuItem value="">
          <em>Fjern valgt</em>
        </MenuItem>
        {selectItems.map(({ label, value, disabled }, i) => (
          <MenuItem key={i} value={value} disabled={disabled}>
            {label ? label : value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage || helperText}</FormHelperText>
    </FormControl>
  );
};

export default GrepSelect as React.ComponentType<GrepSelectProps>;
