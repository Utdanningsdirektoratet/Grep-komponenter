import React, { useEffect } from 'react';
import { Grid, GridSpacing } from '@mui/material';

import { useDate } from '../../hooks/use-date';
import { DateRangeValue } from '../../utils/dateHelper';
import DatePicker, { GrepDatePickerProps } from '../GrepDatePicker';

type CommonProperties = Pick<GrepDatePickerProps, 'variant' | 'margin' | 'sx'>;

interface Props extends CommonProperties {
  from: Omit<GrepDatePickerProps, 'onChange'>;
  to: Omit<GrepDatePickerProps, 'onChange'>;
  onChange: (date: DateRangeValue) => void;
  spacing?: GridSpacing;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  clearable?: any;
  disabled?: any;
  minDate?: any;
  maxDate?: any;
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
      <Grid item xs={12} sm={fullWidth ? 12 : 6}>
        <DatePicker
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
