import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePickerProps,
  DateValidationError,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextFieldProps } from '@mui/material';

import {
  DEFAULT_MIN_DATE,
  DEFAULT_MAX_DATE,
  ParseableDate,
} from '../../utils/dateHelper';
import { useDate } from '../../hooks';

type InputProps = Pick<
  TextFieldProps,
  | 'id'
  | 'variant'
  | 'label'
  | 'fullWidth'
  | 'helperText'
  | 'required'
  | 'margin'
  | 'sx'
>;

export interface GrepDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'renderInput'>, InputProps {
  value?: ParseableDate | null;
  errorMessage?: string;
  clearable?: boolean;
}

export const GrepDatePicker: React.FunctionComponent<GrepDatePickerProps> = ({
  id,
  label,
  value,
  variant,
  errorMessage,
  fullWidth,
  required,
  margin,
  sx,
  clearable,
  minDate = DEFAULT_MIN_DATE,
  maxDate = DEFAULT_MAX_DATE,
  onError,
  ...props
}) => {
  const [date, setDate] = useDate(value);
  const [error, setError] = useState<DateValidationError>(null);

  const validationMessage =
    error === 'maxDate'
      ? `Dato må være før ${maxDate.add(1, 'day').format('DD/MM/YYYY')}`
      : error === 'minDate'
        ? `Dato må være etter ${minDate.subtract(1, 'day').format('DD/MM/YYYY')}`
        : error
          ? 'Ugyldig dato'
          : undefined;

  const helperText = errorMessage || validationMessage || props.helperText;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
      <DatePicker
        format="DD/MM/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        onError={(reason, invalidValue) => {
          setError(reason);
          onError?.(reason, invalidValue);
        }}
        value={date}
        onChange={setDate}
        slotProps={{
          field: {
            clearable: !!clearable,
            onClear: () => setDate(null),
          },
          textField: {
            id: id,
            label: label,
            variant: variant,
            required: required,
            fullWidth: fullWidth,
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

export default GrepDatePicker;
