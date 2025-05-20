import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePickerProps,
  DateValidationError,
  DesktopDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material';

import '../../utils/dateHelper';
import { useDate } from '../../hooks';
import { ParseableDate } from '../../utils/dateHelper';

type InputProps = Pick<
  TextFieldProps,
  | 'id'
  | 'variant'
  | 'label'
  | 'fullWidth'
  | 'placeholder'
  | 'helperText'
  | 'required'
  | 'onFocus'
  | 'margin'
  | 'sx'
>;

export interface GrepDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'renderInput'>,
    InputProps {
  value?: ParseableDate | null;
  errorMessage?: string;
}

export const DatePicker: React.FunctionComponent<GrepDatePickerProps> = ({
  id,
  label,
  value,
  variant,
  errorMessage,
  placeholder,
  fullWidth,
  required,
  onFocus,
  margin,
  sx,
  ...props
}) => {
  const [date, setDate] = useDate(value);
  const [error, setError] = useState<string | undefined>();

  const helperText = errorMessage || error || props.helperText;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
      <DesktopDatePicker
        // clearable @todo
        format="DD/MM/YYYY"
        onError={(reason: DateValidationError) => {
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
        slotProps={{
          textField: {
            id: id,
            label: label,
            variant: variant,
            onFocus: onFocus,
            required: required,
            fullWidth: fullWidth,
            placeholder: placeholder,
            sx: sx,
            margin: margin,
            error: !!error || !!errorMessage,
            ...(helperText && { helperText }),
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
