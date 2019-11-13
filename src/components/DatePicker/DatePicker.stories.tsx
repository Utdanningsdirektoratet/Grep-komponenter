import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CenterLayout from '../CenterLayout/CenterLayout';
import DatePicker from './DatePicker';

storiesOf('GrepDatePicker', module)
  .addDecorator(storyFn => (
    <CenterLayout
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {storyFn()}
    </CenterLayout>
  ))
  .add('Standard', () => (
    <React.Fragment>
      <DatePicker
        label="Med feilmelding"
        inputVariant="standard"
        value={'32.01.2019'}
        onChange={date => console.log(date)}
      />
      <DatePicker
        label="Med hjelpetekst"
        inputVariant="standard"
        helperText="Hjelpetekst"
        value={null}
        onChange={date => console.log(date)}
      />
      <DatePicker
        label="Med placeholder"
        inputVariant="standard"
        placeholder="25/04/2019"
        value={null}
        onChange={date => console.log(date)}
      />
    </React.Fragment>
  ))
  .add('Outlined', () => (
    <React.Fragment>
      <DatePicker
        label="Med feilmelding"
        value={'32.01.2019'}
        onChange={date => console.log(date)}
      />
      <DatePicker
        label="Med hjelpetekst"
        helperText="Hjelpetekst"
        value={null}
        onChange={date => console.log(date)}
      />
      <DatePicker
        label="Med placeholder"
        placeholder="25/04/2019"
        value={null}
        onChange={date => console.log(date)}
      />
    </React.Fragment>
  ));
