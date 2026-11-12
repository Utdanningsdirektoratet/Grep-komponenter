import React, { useEffect } from 'react';
import { useDate } from '../../hooks/use-date';
import {
  DateRangeValue,
  DEFAULT_MIN_DATE,
  DEFAULT_MAX_DATE,
} from '../../utils/dateHelper';
import GrepDatePicker, { GrepDatePickerProps } from '../GrepDatePicker';
import { Dayjs } from 'dayjs';
import Grid, { GridSpacing } from '@mui/material/Grid';

type CommonProperties = Pick<GrepDatePickerProps, 'variant' | 'margin' | 'sx'>;

export interface GrepDateRangeProps extends CommonProperties {
  from: Omit<GrepDatePickerProps, 'onChange'>;
  to: Omit<GrepDatePickerProps, 'onChange'>;
  onChange: (date: DateRangeValue) => void;
  spacing?: GridSpacing;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export const GrepDateRange: React.FunctionComponent<GrepDateRangeProps> = ({
  onChange,
  spacing = 3,
  style,
  fullWidth,
  from: fromProperties,
  to: toProperties,
  ...properties
}: GrepDateRangeProps) => {
  const [from, setFrom] = useDate(fromProperties.value);
  const [to, setTo] = useDate(toProperties.value);
  const { minDate, maxDate, ...commonProperties } = properties;
  const fromMinimum = fromProperties.minDate ?? minDate ?? DEFAULT_MIN_DATE;
  const fromMaximum = fromProperties.maxDate ?? maxDate ?? DEFAULT_MAX_DATE;
  const toMinimum = toProperties.minDate ?? minDate ?? DEFAULT_MIN_DATE;
  const toMaximum = toProperties.maxDate ?? maxDate ?? DEFAULT_MAX_DATE;

  const isWithinBounds = (
    date: Dayjs | null,
    minimum: Dayjs,
    maximum: Dayjs,
  ): date is Dayjs =>
    date !== null &&
    date.isValid() &&
    !date.isBefore(minimum, 'day') &&
    !date.isAfter(maximum, 'day');

  const maximumFromDate =
    isWithinBounds(to, toMinimum, toMaximum) &&
    to.subtract(1, 'day').isBefore(fromMaximum, 'day')
      ? to.subtract(1, 'day')
      : fromMaximum;

  const minimumToDate =
    isWithinBounds(from, fromMinimum, fromMaximum) &&
    from.add(1, 'day').isAfter(toMinimum, 'day')
      ? from.add(1, 'day')
      : toMinimum;

  useEffect(
    () =>
      onChange(
        new DateRangeValue(from ? String(from) : from, to ? String(to) : to),
      ),
    [String(from), String(to)],
  );

  return (
    <Grid container spacing={spacing} style={style}>
      <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
        <GrepDatePicker
          id={String(fromProperties.label)}
          fullWidth
          {...commonProperties}
          {...fromProperties}
          value={from}
          minDate={fromMinimum}
          maxDate={maximumFromDate}
          onChange={setFrom}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
        <GrepDatePicker
          id={String(toProperties.label)}
          fullWidth
          {...commonProperties}
          {...toProperties}
          value={to}
          minDate={minimumToDate}
          maxDate={toMaximum}
          onChange={setTo}
        />
      </Grid>
    </Grid>
  );
};

export default GrepDateRange;
