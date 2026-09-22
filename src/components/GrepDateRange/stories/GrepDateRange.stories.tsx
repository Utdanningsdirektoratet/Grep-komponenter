import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/nb';

import DateRangePicker, { GrepDateRangeProps } from '..';
import { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangeValue } from '../../../utils';

const TestDateRangePicker = (
  args: Omit<GrepDateRangeProps, 'from' | 'to' | 'onChange'>,
) => {
  const dateRange = new DateRangeValue(null, null);
  const [date, setDate] = React.useState<DateRangeValue>(dateRange);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
      <DateRangePicker
        clearable
        from={{
          label: 'from',
          value: date.from ? date.from : null,
          helperText: 'Hjelpetekst',
        }}
        to={{
          label: 'to',
          value: date.to
            ? date.to
            : null /* required: true, maxDate: Date.now() */,
        }}
        onChange={setDate}
        {...args}
      />
    </LocalizationProvider>
  );
};

const meta = {
  component: TestDateRangePicker,
  title: 'GrepDateRange',
} satisfies Meta<typeof TestDateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { variant: 'outlined', disabled: false },
};
