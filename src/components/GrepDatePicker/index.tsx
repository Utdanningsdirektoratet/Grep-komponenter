import React, { useEffect } from 'react';
import '../../utils/dateHelper';

import {
  DatePickerProps,
  DesktopDatePicker,
  // DesktopDatePickerProps,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

import { useDate } from '../../hooks';
import { ParseableDate } from '../../utils/dateHelper';
import { TextField, TextFieldProps } from '@mui/material';
import { Dayjs } from 'dayjs';

type DateInput = ParseableDate | null;

export interface GrepDatePickerProps
  extends Omit<DatePickerProps<Dayjs>, 'value' | 'renderInput'>,
    Pick<
      TextFieldProps,
      | 'id'
      | 'variant'
      | 'error'
      | 'helperText'
      | 'placeholder'
      | 'fullWidth'
      | 'label'
    > {
  value?: DateInput;
  errorMessage?: string;
}

export const DatePicker: React.FunctionComponent<GrepDatePickerProps> = ({
  value,
  onChange,
  errorMessage,
  variant,
  placeholder,
  id,
  fullWidth,
  label,
  ...props
}) => {
  const [date, setDate] = useDate(value);

  const error = !!errorMessage || props.error;
  const helperText = errorMessage || props.helperText;

  useEffect(() => onChange(date), [String(date)]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={'nb'}>
      <DesktopDatePicker
        // default
        // clearable
        inputFormat="DD/MM/YYYY"
        // mask={'__/__/____'}
        // invalidDateMessage={'Ugyldig dato'}
        // margin="normal"
        // KeyboardButtonProps={{
        //   'aria-label': 'change date',
        // }}

        // logic
        // {...props}
        value={date}
        onChange={setDate}
        renderInput={(params) => (
          <TextField
            id={id}
            {...params}
            label={label}
            fullWidth={fullWidth}
            variant={variant}
            placeholder={placeholder}
            {...(error && { error })}
            {...(helperText && { helperText })}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
