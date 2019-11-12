import React, { useEffect } from 'react';
import {
    KeyboardDatePicker,
    KeyboardDatePickerProps
} from '@material-ui/pickers';
import { useDate, DateInput } from '../../hooks';

export interface DatePickerProps
    extends Omit<KeyboardDatePickerProps, 'value'> {
    value?: DateInput;
    errorMessage?: string;
}

export default ({
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
    );
};
