import React, { useCallback } from 'react';
import { useDate } from '../../hooks/use-date';
import { DateRangeValue } from '../../utils/dateHelper';
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

  useCallback(
    () =>
      onChange(
        new DateRangeValue(from ? String(from) : from, to ? String(to) : to),
      ),
    [from, to, onChange],
  );

  return (
    <Grid container spacing={spacing} style={style}>
      <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
        <GrepDatePicker
          id={String(fromProperties.label)}
          fullWidth
          minDate={minDate}
          {...commonProperties}
          {...fromProperties}
          value={from}
          maxDate={to?.subtract(1, 'day') || undefined}
          onChange={setFrom}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
        <GrepDatePicker
          id={String(toProperties.label)}
          fullWidth
          maxDate={maxDate}
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
