import React, { useMemo } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import {
    KeyboardDatePicker,
    KeyboardDatePickerProps
} from '@material-ui/pickers/DatePicker';

export type GrepDate = {
    valid: boolean;
    value: Dayjs|null;
};

interface Props extends Omit<KeyboardDatePickerProps, 'value' | 'onChange'> {
    initialDate?: string | number | Date | Dayjs;
    // override?: string | number | Date | Dayjs;
    onChange?: (date: GrepDate) => void;
    validate?: (date: Dayjs|null) => boolean;
}

export default ({
    maxDate,
    minDate,
    // override,
    onChange,
    initialDate,
    validate = (date: Dayjs|null) =>  !!(date && date.isValid()),
    ...props
}: Props) => {
    const [_date, _setDate] = React.useState<Dayjs|null>(initialDate ? dayjs(initialDate) : null);
    useMemo(() => onChange && onChange({
        valid: validate(_date),
        value: _date
    }), [_date]);

    // React.useMemo(() => {
    //     _setDate(dayjs(override));
    // }, [override]);

    return (
        <KeyboardDatePicker
            {...props}
            clearable
            value={_date}
            format="DD/MM/YYYY"
            margin={props.margin || 'normal'}
            inputVariant={props.inputVariant || 'outlined'}
            invalidDateMessage={props.invalidDateMessage || 'Ugyldig dato'}
            onChange={_setDate}
        />
    );
};
