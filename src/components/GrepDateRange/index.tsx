import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import DatePicker, { DatePickerProps } from '../GrepDatePicker';
import { useDate, DateState } from '../../hooks';

import { GridSpacing } from '@material-ui/core/Grid';

interface Props extends Pick<DatePickerProps, 'inputVariant'> {
    from: Omit<DatePickerProps, 'onChange'>;
    to: Omit<DatePickerProps, 'onChange'>;
    onChange: (date: { from: DateState; to: DateState }) => void;
    // container
    spacing?: GridSpacing;
}

export default ({ onChange, spacing, inputVariant, ...props }: Props) => {
    const [from, setFrom] = useDate(props.from.value);
    const [to, setTo] = useDate(props.to.value);
    useEffect(() => onChange({ from, to }), [from, to]);
    return (
        <Grid container spacing={spacing || 3}>
            <Grid item xs={12} sm={6}>
                <DatePicker
                    // default
                    fullWidth
                    label={props.from.label}
                    inputVariant={inputVariant}
                    maxDateMessage={`Dato må være først "${props.to.label}"`}
                    // logic
                    {...props.from }
                    value={from}
                    maxDate={to || undefined}
                    onChange={setFrom}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DatePicker
                    // default
                    fullWidth
                    label={props.to.label}
                    inputVariant={inputVariant}
                    minDateMessage={`Dato må være først "${props.from.label}"`}
                    // logic
                    {...props.to }
                    value={to}
                    minDate={from || undefined}
                    onChange={setTo}
                />
            </Grid>
        </Grid>
    );
};
