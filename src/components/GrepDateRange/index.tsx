import React from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { DatePickerProps } from '../DatePicker';
import GrepDatePicker, { GrepDate } from '../GrepDatePicker';
import { GridSpacing } from '@material-ui/core/Grid';

interface Props extends Omit<DatePickerProps, 'value' | 'onChange'> {
  fromLabel: string;
  toLabel: string;
  override?: DateRange;
  spacing?: GridSpacing;
  onChange: (date: DateRange) => void;
}

export type DateRange = {
  fromDate: string;
  toDate: string;
  valid?: boolean;
};

export default ({
  fromLabel,
  toLabel,
  onChange,
  override,
  spacing,
  ...props
}: Props) => {
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [fromDateValid, setFromDateValid] = React.useState(true);
  const [toDateValid, setToDateValid] = React.useState(true);

  const maxDate = toDate ? moment(toDate) : new Date('01/01/2200');
  const minDate = fromDate ? moment(fromDate) : new Date('01/01/1900');

  const handleFromDate = ({ value, valid }: GrepDate) => {
    setFromDate(value);
    setFromDateValid(valid);
  };

  const handleToDate = ({ value, valid }: GrepDate) => {
    setToDate(value);
    setToDateValid(valid);
  };

  React.useMemo(() => {
    let valid = fromDateValid && toDateValid;

    if (valid) {
      const from = fromDate ? moment(fromDate) : null;
      const to = toDate ? moment(toDate) : null;

      const fromValid = from ? from.diff(maxDate, 'days') < 1 : true;
      const toValid = to ? to.diff(minDate, 'days') > -1 : true;

      valid = fromValid && toValid;
    }

    onChange({ fromDate, toDate, valid });
  }, [fromDate, toDate]);

  return (
    <Grid container spacing={spacing}>
      <Grid item xs={12} sm={6}>
        <GrepDatePicker
          {...props}
          label={fromLabel}
          onChange={handleFromDate}
          override={override && override.fromDate}
          maxDateMessage={`Dato må være før "${toLabel}"`}
          maxDate={maxDate}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GrepDatePicker
          {...props}
          label={toLabel}
          onChange={handleToDate}
          override={override && override.toDate}
          minDateMessage={`Dato må være etter "${fromLabel}"`}
          minDate={minDate}
        />
      </Grid>
    </Grid>
  );
};
