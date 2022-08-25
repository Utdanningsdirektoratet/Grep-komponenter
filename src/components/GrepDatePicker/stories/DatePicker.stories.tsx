import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Box, Container } from '@mui/material';

import { ParseableDate, DateTime } from '../../../utils';
import DatePicker from '..';

const TestDatePicker = () => {
  const [value, setValue] = React.useState<ParseableDate | null>(
    '1993-12-12T23:00:00',
  );
  return (
    <Box display="flex" flexDirection="column">
      <DatePicker
        label="Med feilmelding"
        variant="standard"
        errorMessage="Feilmelding"
        value={value}
        onChange={(date: any) => {
          setValue(date);
        }}
      />
      <Button onClick={() => setValue(DateTime('1980-12-17'))}>
        set to 17.12.1980
      </Button>
      <Button onClick={() => setValue(null)}>clear</Button>
    </Box>
  );
};

storiesOf('GrepDatePicker', module)
  .addDecorator((storyFn) => (
    <Container
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
        {storyFn()}
      </LocalizationProvider>
    </Container>
  ))
  .add('Standard', () => {
    return (
      <React.Fragment>
        <TestDatePicker />
        <DatePicker
          label="Med hjelpetekst"
          variant="standard"
          helperText="Hjelpetekst"
          onChange={(date: any) => console.log(date)}
        />
        <DatePicker
          label="Med placeholder"
          variant="standard"
          placeholder="25/04/2019"
          onChange={(date: any) => console.log(date)}
        />
      </React.Fragment>
    );
  })
  .add('Test', () => <TestDatePicker />)
  .add('Outlined', () => (
    <React.Fragment>
      <DatePicker
        label="Med feilmelding"
        value={'32.01.2019'}
        onChange={(date: any) => console.log(date)}
      />
      <DatePicker
        label="Med hjelpetekst"
        helperText="Hjelpetekst"
        value={null}
        onChange={(date: any) => console.log(date)}
      />
      <DatePicker
        label="Med placeholder"
        placeholder="25/04/2019"
        value={null}
        onChange={(date: any) => console.log(date)}
      />
    </React.Fragment>
  ));
