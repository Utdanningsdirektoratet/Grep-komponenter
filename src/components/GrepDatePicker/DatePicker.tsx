import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
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

dayjs.locale('nb');

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  value,
  onChange,
  errorMessage,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = useDate(value);
  useEffect(() => onChange(date), [date]);
  const { error, ...overridden } = props;
  const helperText = errorMessage || props.helperText;
  return (
    <MuiPickersUtilsProvider utils={DayjsIo} locale={'nb'}>
      <KeyboardDatePicker
        // default
        clearable
        format={'DD/MM/YYYY'}
        invalidDateMessage={'Ugyldig dato'}
        margin="normal"
        // logic
        {...overridden}
        {...(error && error)}
        {...(helperText && helperText)}
        // helperText={errorMessage || props.helperText}
        value={date}
        onChange={setDate}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
