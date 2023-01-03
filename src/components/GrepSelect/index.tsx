import * as React from 'react';
import {
  Input,
  Select,
  SelectProps,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
  ListItemText,
  Checkbox,
  InputBaseComponentProps,
} from '@mui/material';

export interface SelectItem {
  value: string | number;
  label?: string;
  disabled?: boolean;
  lang?: string;
}
export interface GrepSelectProps extends SelectProps {
  label: string;
  outlined?: boolean;
  helperText?: string;
  errorMessage?: string;
  selectItems: SelectItem[];
  unselectOption?: boolean;
  useCheckedSelect?: boolean;
  inputProps?: InputBaseComponentProps | undefined;
}

const GrepSelect: React.FC<GrepSelectProps> = (props) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const {
    unselectOption = true,
    errorMessage,
    selectItems,
    helperText,
    fullWidth,
    outlined,
    disabled,
    required,
    label,
    inputProps,
    value,
    size,
    id,
    useCheckedSelect,
    ...rest
  } = props;

  const error = errorMessage ? errorMessage.length > 0 : false;
  const selected = value;

  return (
    <FormControl
      variant={outlined ? 'outlined' : 'standard'}
      className={props.className}
      fullWidth={fullWidth}
      required={required}
      style={props.style}
      error={error}
      size={size}
      disabled={disabled}
    >
      <InputLabel
        htmlFor={id}
        ref={inputLabel}
        style={{
          minWidth: 'max-content',
          overflow: 'visible',
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...rest}
        inputProps={{ id, ...inputProps }}
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
        {unselectOption && (
          <MenuItem value="">
            <em>Fjern valgt</em>
          </MenuItem>
        )}
        {selectItems.map(({ label, value, disabled, lang }, i) => (
          <MenuItem key={i} value={value} disabled={disabled} lang={lang}>
            {useCheckedSelect && (
              <Checkbox
                checked={(selected as number[])?.indexOf(value as number) > -1}
              />
            )}
            <ListItemText
              sx={{ margin: '0px', span: { lineHeight: '1.4375em' } }}
              primary={label ? label : value}
            />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage || helperText}</FormHelperText>
    </FormControl>
  );
};

export default GrepSelect as React.ComponentType<GrepSelectProps>;
