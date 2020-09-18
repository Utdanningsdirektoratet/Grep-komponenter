import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DateRangePicker from '..';

import 'dayjs/locale/nb';
import DateUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField, Box } from '@material-ui/core';

storiesOf('DateRangePicker', module)
  .addDecorator((storyFn) => (
    <MuiPickersUtilsProvider utils={DateUtils} locale={'nb'}>
      {storyFn()}
    </MuiPickersUtilsProvider>
  ))
  .add('Standard', () => (
    <Box>
      <DateRangePicker
        from={{ label: 'from', helperText: 'elgber' }}
        to={{ label: 'to', required: true, maxDate: Date.now() }}
        inputVariant="outlined"
        onChange={console.log}
      />
      <TextField required label="elgbert"></TextField>
    </Box>
  ));
