import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DateRangePicker from '..';

import 'dayjs/locale/nb';
import DateUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

storiesOf('GrepDateRange', module)
  .addDecorator((storyFn) => (
    <MuiPickersUtilsProvider utils={DateUtils} locale={'nb'}>
      {storyFn()}
    </MuiPickersUtilsProvider>
  ))
  .add('Standard', () => (
    <DateRangePicker
      from={{ label: 'from', helperText: 'Hjelpetekst' }}
      to={{ label: 'to', required: true, maxDate: Date.now() }}
      inputVariant="outlined"
      onChange={console.log}
    />
  ));
