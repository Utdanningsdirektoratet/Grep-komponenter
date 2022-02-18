import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
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
