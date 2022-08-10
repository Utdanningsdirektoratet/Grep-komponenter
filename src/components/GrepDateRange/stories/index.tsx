import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/nb';

import DateRangePicker from '..';

storiesOf('GrepDateRange', module)
  .addDecorator((storyFn) => (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={'nb'}>
      {storyFn()}
    </LocalizationProvider>
  ))
  .add('Standard', () => (
    <DateRangePicker
      from={{ label: 'from', helperText: 'Hjelpetekst' }}
      to={{ label: 'to' /* required: true, maxDate: Date.now() */ }}
      variant="outlined"
      onChange={console.log}
    />
  ));
