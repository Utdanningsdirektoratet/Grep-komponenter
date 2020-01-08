import React, { useEffect } from 'react';
import '../../utils/dateHelper';
import DayjsIo from '@date-io/dayjs';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useDate } from '../../hooks';
import { ParseableDate } from '../../utils/dateHelper';

type DateInput = ParseableDate | null;

export interface DatePickerProps
  extends Omit<KeyboardDatePickerProps, 'value'> {
  value?: DateInput;
  errorMessage?: string;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  value,
  onChange,
  errorMessage,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = useDate(value);
  const error = !!errorMessage || props.error;
  const helperText = errorMessage || props.helperText;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChange(date), [String(date), onChange]);
  return (
    <MuiPickersUtilsProvider utils={DayjsIo} locale={'nb'}>
      <KeyboardDatePicker
        // default
        clearable
        disableToolbar
        format={'DD/MM/YYYY'}
        invalidDateMessage={'Ugyldig dato'}
        margin="normal"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        // logic
        {...props}
        {...(error && { error })}
        {...(helperText && { helperText })}
        value={date}
        onChange={setDate}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
