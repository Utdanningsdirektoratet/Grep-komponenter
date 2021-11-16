import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import DatePicker, { DatePickerProps } from '../GrepDatePicker';
import { useDate } from '../../hooks/use-date';

import { GridSpacing } from '@material-ui/core/Grid';
import { DateRangeValue } from '../../utils/dateHelper';

type CommonProperties = Pick<
  DatePickerProps,
  | 'variant'
  | 'inputVariant'
  | 'format'
  | 'clearable'
  | 'disabled'
  | 'invalidDateMessage'
  | 'emptyLabel'
>;

type ReferenceProperties = Pick<DatePickerProps, 'minDate' | 'maxDate'>;

interface Props extends CommonProperties, ReferenceProperties {
  from: Omit<DatePickerProps, 'onChange'>;
  to: Omit<DatePickerProps, 'onChange'>;
  onChange: (date: DateRangeValue) => void;
  // container
  spacing?: GridSpacing;
  disabled?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export const GrepDateRange: React.FunctionComponent<Props> = ({
  onChange,
  spacing = 3,
  style,
  fullWidth,
  from: fromProperties,
  to: toProperties,
  ...properties
}: Props) => {
  const [from, setFrom] = useDate(fromProperties.value);
  const [to, setTo] = useDate(toProperties.value);
  const { minDate, maxDate, ...commonProperties } = properties;

  useEffect(
    () => onChange(new DateRangeValue(from, to)),
    [String(from), String(to)],
  );

  return (
    <Grid container spacing={spacing} style={style}>
      <Grid item xs={12} sm={fullWidth ? 12 : 6}>
        <DatePicker
          // default
          id={String(fromProperties.label)}
          fullWidth
          minDate={minDate}
          maxDateMessage={`Dato må være før "${toProperties.label}"`}
          // logic
          {...commonProperties}
          {...fromProperties}
          value={from}
          maxDate={to?.subtract(1, 'day') || undefined}
          onChange={setFrom}
        />
      </Grid>
      <Grid item xs={12} sm={fullWidth ? 12 : 6}>
        <DatePicker
          // default
          id={String(toProperties.label)}
          fullWidth
          maxDate={maxDate}
          minDateMessage={`Dato må være etter "${fromProperties.label}"`}
          // logic
          {...commonProperties}
          {...toProperties}
          value={to}
          minDate={from?.add(1, 'day') || undefined}
          onChange={setTo}
        />
      </Grid>
    </Grid>
  );
};

export default GrepDateRange;
