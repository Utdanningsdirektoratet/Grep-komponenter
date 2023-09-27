import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/nb';

import DateRangePicker from '..';

export default {
  title: "GrepDateRange",
  
  decorators: [
    (storyFn: any) => (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={'nb'}>
        {storyFn()}
      </LocalizationProvider>
    ),
  ],
};

export const Standard = () => {
  return (
    <DateRangePicker
      from={{ label: 'from', helperText: 'Hjelpetekst' }}
      to={{ label: 'to' /* required: true, maxDate: Date.now() */ }}
      variant="outlined"
      onChange={console.log}
    />
  )
};