import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  DatePickerProps,
  DesktopDatePicker,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { TextField, TextFieldProps } from '@mui/material';

import '../../utils/dateHelper';
import { useDate } from '../../hooks';
import { ParseableDate } from '../../utils/dateHelper';

type InputProps = Pick<
  TextFieldProps,
  'id' | 'variant' | 'label' | 'fullWidth' | 'placeholder' | 'helperText'
>;

export interface GrepDatePickerProps
  extends Omit<DatePickerProps<Dayjs>, 'value' | 'renderInput'>,
    InputProps {
  value?: ParseableDate | null;
  errorMessage?: string;
}

export const DatePicker: React.FunctionComponent<GrepDatePickerProps> = ({
  id,
  label,
  value,
  variant,
  onChange,
  errorMessage,
  placeholder,
  fullWidth,
  ...props
}) => {
  const [date, setDate] = useDate(value);
  const [error, setError] = useState<string | undefined>();

  const helperText = errorMessage || error || props.helperText;

  useEffect(() => onChange(date), [String(date)]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={'nb'}>
      <DesktopDatePicker
        // clearable @todo
        inputFormat="DD/MM/YYYY"
        onError={(reason) => {
          switch (reason) {
            case 'invalidDate':
              setError('Ugyldig dato');
              break;

            case 'maxDate':
              setError(
                `Dato må være før ${dayjs(props.maxDate)
                  .add(1, 'day')
                  .format('DD/MM/YYYY')}`,
              );
              break;

            case 'minDate':
              setError(
                `Dato må være etter ${dayjs(props.minDate)
                  .subtract(1, 'day')
                  .format('DD/MM/YYYY')}`,
              );
              break;

            default:
              setError(undefined);
          }
        }}
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
            {...(helperText && { helperText })}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
