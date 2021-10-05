import * as React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import { Input, FormHelperText, PropTypes } from '@material-ui/core';

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
  formMargin?: PropTypes.Margin;
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
      <InputLabel ref={inputLabel} style={{ width: 'max-content' }}>
        {label}
      </InputLabel>
      <Select
        {...rest}
        disabled={!selectItems || disabled}
        value={value === null ? '' : value}
        style={{ minWidth: labelWidth + (outlined ? 35 : 25) }}
        input={outlined ? <OutlinedInput labelWidth={labelWidth} /> : <Input />}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          getContentAnchorEl: null,
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
